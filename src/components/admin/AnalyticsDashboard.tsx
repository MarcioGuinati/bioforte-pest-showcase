import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart3, 
  Eye, 
  MousePointer, 
  Smartphone, 
  Monitor, 
  Tablet,
  Globe,
  TrendingUp,
  Calendar
} from "lucide-react";
import { format, subDays, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalyticsEvent {
  id: string;
  post_id: string;
  post_slug: string;
  post_title: string;
  event_type: 'view' | 'click';
  device_type: 'mobile' | 'tablet' | 'desktop';
  referrer: string;
  timestamp: Date;
}

const COLORS = {
  primary: 'hsl(150, 54%, 28%)',
  secondary: 'hsl(127, 48%, 45%)',
  accent: 'hsl(90, 67%, 38%)',
};

const DEVICE_COLORS = {
  desktop: 'hsl(150, 54%, 28%)',
  mobile: 'hsl(127, 48%, 45%)',
  tablet: 'hsl(90, 67%, 38%)',
};

export function AnalyticsDashboard() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["blog-analytics"],
    queryFn: async () => {
      const analyticsRef = collection(db, "blog_analytics");
      const thirtyDaysAgo = Timestamp.fromDate(subDays(new Date(), 30));
      
      const q = query(
        analyticsRef,
        where("timestamp", ">=", thirtyDaysAgo),
        orderBy("timestamp", "desc")
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      })) as AnalyticsEvent[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-card border-border">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const events = analytics || [];
  
  // Calculate metrics
  const totalViews = events.filter(e => e.event_type === 'view').length;
  const totalClicks = events.filter(e => e.event_type === 'click').length;
  
  // Device breakdown
  const deviceBreakdown = events.reduce((acc, event) => {
    acc[event.device_type] = (acc[event.device_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deviceData = [
    { name: 'Desktop', value: deviceBreakdown.desktop || 0, color: DEVICE_COLORS.desktop },
    { name: 'Mobile', value: deviceBreakdown.mobile || 0, color: DEVICE_COLORS.mobile },
    { name: 'Tablet', value: deviceBreakdown.tablet || 0, color: DEVICE_COLORS.tablet },
  ].filter(d => d.value > 0);

  // Top referrers
  const referrerBreakdown = events.reduce((acc, event) => {
    const referrer = event.referrer === 'direct' ? 'Direto' : 
      new URL(event.referrer).hostname.replace('www.', '');
    acc[referrer] = (acc[referrer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topReferrers = Object.entries(referrerBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Top posts
  const postBreakdown = events.reduce((acc, event) => {
    if (!acc[event.post_title]) {
      acc[event.post_title] = { views: 0, clicks: 0 };
    }
    if (event.event_type === 'view') acc[event.post_title].views++;
    if (event.event_type === 'click') acc[event.post_title].clicks++;
    return acc;
  }, {} as Record<string, { views: number; clicks: number }>);

  const topPosts = Object.entries(postBreakdown)
    .sort((a, b) => (b[1].views + b[1].clicks) - (a[1].views + a[1].clicks))
    .slice(0, 5);

  // Daily data for chart (last 7 days)
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayStart = startOfDay(date);
    const dayEvents = events.filter(e => {
      const eventDay = startOfDay(e.timestamp);
      return eventDay.getTime() === dayStart.getTime();
    });
    
    return {
      day: format(date, 'EEE', { locale: ptBR }),
      views: dayEvents.filter(e => e.event_type === 'view').length,
      clicks: dayEvents.filter(e => e.event_type === 'click').length,
    };
  });

  const chartConfig = {
    views: { label: "Visualizações", color: COLORS.primary },
    clicks: { label: "Cliques", color: COLORS.secondary },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Visualizações
            </CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalViews}</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Cliques
            </CardTitle>
            <MousePointer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Acessos Mobile
            </CardTitle>
            <Smartphone className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {deviceBreakdown.mobile || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {events.length > 0 
                ? `${Math.round(((deviceBreakdown.mobile || 0) / events.length) * 100)}% do total`
                : '0% do total'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Acessos Desktop
            </CardTitle>
            <Monitor className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {deviceBreakdown.desktop || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {events.length > 0 
                ? `${Math.round(((deviceBreakdown.desktop || 0) / events.length) * 100)}% do total`
                : '0% do total'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Daily Activity Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Atividade dos Últimos 7 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={dailyData}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Tablet className="h-5 w-5 text-primary" />
              Dispositivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deviceData.length > 0 ? (
              <div className="flex items-center gap-6">
                <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-2">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: device.color }}
                      />
                      <span className="text-sm text-foreground">{device.name}</span>
                      <span className="text-sm text-muted-foreground">({device.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhum dado disponível
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Posts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Posts Mais Acessados
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Top 5 posts com mais interações
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topPosts.length > 0 ? (
              <div className="space-y-3">
                {topPosts.map(([title, stats], index) => (
                  <div key={title} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Badge variant="outline" className="shrink-0">
                        #{index + 1}
                      </Badge>
                      <span className="text-sm text-foreground truncate">
                        {title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {stats.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MousePointer className="h-3 w-3" /> {stats.clicks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhum dado disponível
              </p>
            )}
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Origem do Tráfego
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              De onde os visitantes estão vindo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topReferrers.length > 0 ? (
              <div className="space-y-3">
                {topReferrers.map(([referrer, count], index) => (
                  <div key={referrer} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="text-sm text-foreground">{referrer}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{count} visitas</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhum dado disponível
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
