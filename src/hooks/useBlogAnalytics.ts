import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AnalyticsEvent {
  post_id: string;
  post_slug: string;
  post_title: string;
  event_type: 'view' | 'click';
  device_type: 'mobile' | 'tablet' | 'desktop';
  user_agent: string;
  referrer: string;
  page_url: string;
  screen_width: number;
  screen_height: number;
  language: string;
  timestamp: ReturnType<typeof Timestamp.now>;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export async function trackBlogEvent(
  postId: string,
  postSlug: string,
  postTitle: string,
  eventType: 'view' | 'click'
) {
  try {
    const event: AnalyticsEvent = {
      post_id: postId,
      post_slug: postSlug,
      post_title: postTitle,
      event_type: eventType,
      device_type: getDeviceType(),
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      page_url: window.location.href,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      language: navigator.language,
      timestamp: Timestamp.now(),
    };

    await addDoc(collection(db, 'blog_analytics'), event);
  } catch (error) {
    console.error('Error tracking blog event:', error);
  }
}

export function useBlogAnalytics() {
  const trackView = (postId: string, postSlug: string, postTitle: string) => {
    trackBlogEvent(postId, postSlug, postTitle, 'view');
  };

  const trackClick = (postId: string, postSlug: string, postTitle: string) => {
    trackBlogEvent(postId, postSlug, postTitle, 'click');
  };

  return { trackView, trackClick };
}
