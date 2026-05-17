import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogIn, Loader2, Shield, Sun, Moon } from "lucide-react";
import logoImage from "@/assets/logo-bioforte.webp";
import logoImageWhite from "@/assets/logo-bioforte-white.webp";
import { useAdminTheme } from "@/hooks/useAdminTheme";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useAdminTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user has admin role in Firestore
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      
      if (!adminDoc.exists() || !adminDoc.data()?.isAdmin) {
        await auth.signOut();
        throw new Error("Acesso negado. Você não tem permissão de administrador.");
      }

      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error("E-mail ou senha incorretos");
        } else if (error.message.includes("auth/user-not-found")) {
          toast.error("Usuário não encontrado");
        } else if (error.message.includes("auth/wrong-password")) {
          toast.error("Senha incorreta");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="mb-8">
            <img src={logoImageWhite} alt="Bioforte" className="h-16" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Painel Administrativo
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Gerencie o conteúdo do blog, acompanhe métricas de acesso e configure integrações com inteligência artificial.
          </p>
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Acesso Seguro</p>
                <p className="text-sm text-primary-foreground/70">Autenticação protegida por Firebase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="border-border"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-foreground" />
              )}
            </Button>
          </div>

          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img src={theme === 'dark' ? logoImageWhite : logoImage} alt="Bioforte" className="h-16" />
          </div>

          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Área Administrativa</CardTitle>
              <CardDescription className="text-muted-foreground">
                Faça login para acessar o painel de administração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Entrar
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            © {new Date().getFullYear()} Bioforte Controle de Pragas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
