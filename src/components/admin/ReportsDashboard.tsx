import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Briefcase,
  ClipboardList,
  MessageSquare,
  FileText,
  TrendingUp,
  AlertCircle,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import { format, subDays, startOfDay, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = [
  'hsl(150, 54%, 28%)',
  'hsl(127, 48%, 45%)',
  'hsl(90, 67%, 38%)',
  'hsl(43, 74%, 49%)',
  'hsl(38, 92%, 45%)',
  'hsl(0, 84%, 50%)',
];

const urgencyLabels: Record<string, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
  emergencia: "Emergência",
};

export function ReportsDashboard() {
  const { data: teamMembers, isLoading: loadingTeam } = useQuery({
    queryKey: ["report-team"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "team"));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  });

  const { data: jobs, isLoading: loadingJobs } = useQuery({
    queryKey: ["report-jobs"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  });

  const { data: applications, isLoading: loadingApps } = useQuery({
    queryKey: ["report-applications"],
    queryFn: async () => {
      const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
    },
  });

  const { data: contacts, isLoading: loadingContacts } = useQuery({
    queryKey: ["report-contacts"],
    queryFn: async () => {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
    },
  });

  const { data: blogPosts, isLoading: loadingPosts } = useQuery({
    queryKey: ["report-blog"],
    queryFn: async () => {
      const q = query(collection(db, "blog_posts"), orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate?.() || new Date(),
      }));
    },
  });

  const isLoading = loadingTeam || loadingJobs || loadingApps || loadingContacts || loadingPosts;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="bg-card border-border">
              <CardHeader className="pb-2"><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-16" /></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const team = teamMembers || [];
  const jobsList = jobs || [];
  const apps = applications || [];
  const contactsList = contacts || [];
  const posts = blogPosts || [];

  // Summary counts
  const totalTeam = team.length;
  const totalJobs = jobsList.length;
  const activeJobs = jobsList.filter((j: any) => j.active !== false).length;
  const totalApps = apps.length;
  const totalContacts = contactsList.length;
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p: any) => p.published).length;

  // Last 30 days counts
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentApps = apps.filter((a: any) => a.createdAt > thirtyDaysAgo).length;
  const recentContacts = contactsList.filter((c: any) => c.createdAt > thirtyDaysAgo).length;

  // Applications per day (last 7 days)
  const appsDaily = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayStart = startOfDay(date);
    const count = apps.filter((a: any) => {
      const d = startOfDay(a.createdAt);
      return d.getTime() === dayStart.getTime();
    }).length;
    return { day: format(date, 'EEE', { locale: ptBR }), candidaturas: count };
  });

  // Contacts per day (last 7 days)
  const contactsDaily = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayStart = startOfDay(date);
    const count = contactsList.filter((c: any) => {
      const d = startOfDay(c.createdAt);
      return d.getTime() === dayStart.getTime();
    }).length;
    return { day: format(date, 'EEE', { locale: ptBR }), contatos: count };
  });

  // Team by area
  const teamByArea = team.reduce((acc: Record<string, number>, member: any) => {
    const area = member.area || "Não informado";
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {});
  const teamAreaData = Object.entries(teamByArea).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));

  // Applications by position
  const appsByPosition = apps.reduce((acc: Record<string, number>, app: any) => {
    const pos = app.position || "Não especificado";
    acc[pos] = (acc[pos] || 0) + 1;
    return acc;
  }, {});
  const topPositions = Object.entries(appsByPosition)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5);

  // Contacts by urgency
  const contactsByUrgency = contactsList.reduce((acc: Record<string, number>, c: any) => {
    const urgency = c.urgency || "nao_informada";
    acc[urgency] = (acc[urgency] || 0) + 1;
    return acc;
  }, {});
  const urgencyData = Object.entries(contactsByUrgency).map(([name, value], i) => ({
    name: urgencyLabels[name] || "Não informada",
    value,
    color: COLORS[i % COLORS.length],
  }));

  // Contacts by service
  const contactsByService = contactsList.reduce((acc: Record<string, number>, c: any) => {
    const service = c.service || "Não especificado";
    acc[service] = (acc[service] || 0) + 1;
    return acc;
  }, {});
  const topServices = Object.entries(contactsByService)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5);

  // Jobs by location
  const jobsByLocation = jobsList.reduce((acc: Record<string, number>, j: any) => {
    const loc = j.location || "Não informado";
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  // Monthly trend (last 6 months)
  const monthlyTrend = Array.from({ length: 6 }, (_, i) => {
    const date = subDays(new Date(), (5 - i) * 30);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const interval = { start: monthStart, end: monthEnd };

    return {
      month: format(date, 'MMM', { locale: ptBR }),
      candidaturas: apps.filter((a: any) => isWithinInterval(a.createdAt, interval)).length,
      contatos: contactsList.filter((c: any) => isWithinInterval(c.createdAt, interval)).length,
    };
  });

  const chartConfig = {
    candidaturas: { label: "Candidaturas", color: COLORS[0] },
    contatos: { label: "Contatos", color: COLORS[1] },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Relatórios Gerais</h2>
        <p className="text-sm text-muted-foreground">Visão geral de todas as áreas do sistema</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Equipe</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalTeam}</div>
            <p className="text-xs text-muted-foreground">membros cadastrados</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vagas</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">{activeJobs} ativa(s)</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Candidaturas</CardTitle>
            <ClipboardList className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalApps}</div>
            <p className="text-xs text-muted-foreground">+{recentApps} nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contatos</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalContacts}</div>
            <p className="text-xs text-muted-foreground">+{recentContacts} nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Blog</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">{publishedPosts} publicado(s)</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Tendência Mensal (6 meses)
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Evolução de candidaturas e contatos ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="candidaturas" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="contatos" stroke={COLORS[1]} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Applications last 7 days */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Candidaturas (7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={appsDaily}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="candidaturas" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Contacts last 7 days */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Contatos (7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={contactsDaily}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="contatos" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Row */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Team by Area */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Equipe por Área
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teamAreaData.length > 0 ? (
              <div className="flex items-center gap-4">
                <ChartContainer config={chartConfig} className="h-[160px] w-[160px]">
                  <PieChart>
                    <Pie data={teamAreaData} cx="50%" cy="50%" innerRadius={30} outerRadius={65} dataKey="value">
                      {teamAreaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-1.5 flex-1">
                  {teamAreaData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-foreground truncate">{item.name}</span>
                      <span className="text-muted-foreground ml-auto">({item.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">Sem dados</p>
            )}
          </CardContent>
        </Card>

        {/* Contacts by Urgency */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Contatos por Urgência
            </CardTitle>
          </CardHeader>
          <CardContent>
            {urgencyData.length > 0 ? (
              <div className="flex items-center gap-4">
                <ChartContainer config={chartConfig} className="h-[160px] w-[160px]">
                  <PieChart>
                    <Pie data={urgencyData} cx="50%" cy="50%" innerRadius={30} outerRadius={65} dataKey="value">
                      {urgencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-1.5 flex-1">
                  {urgencyData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-foreground truncate">{item.name}</span>
                      <span className="text-muted-foreground ml-auto">({item.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">Sem dados</p>
            )}
          </CardContent>
        </Card>

        {/* Jobs by Location */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Vagas por Localização
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(jobsByLocation).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(jobsByLocation)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([loc, count], i) => (
                    <div key={loc} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="shrink-0">#{i + 1}</Badge>
                        <span className="text-sm text-foreground truncate">{loc}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{count as number} vaga(s)</span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">Sem dados</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rankings Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top positions applied */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Vagas Mais Procuradas
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Cargos com mais candidaturas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topPositions.length > 0 ? (
              <div className="space-y-3">
                {topPositions.map(([position, count], index) => (
                  <div key={position} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Badge variant="outline" className="shrink-0">#{index + 1}</Badge>
                      <span className="text-sm text-foreground truncate">{position}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{count as number}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">Sem dados</p>
            )}
          </CardContent>
        </Card>

        {/* Top services requested */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Serviços Mais Solicitados
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Serviços com mais contatos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topServices.length > 0 ? (
              <div className="space-y-3">
                {topServices.map(([service, count], index) => (
                  <div key={service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Badge variant="outline" className="shrink-0">#{index + 1}</Badge>
                      <span className="text-sm text-foreground truncate">{service}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{count as number}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">Sem dados</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
