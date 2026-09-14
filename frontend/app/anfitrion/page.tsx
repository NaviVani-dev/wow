import Link from "next/link";
import { LogOut } from "lucide-react";


import {
  Home,
  LogIn,
  UserPlus,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




const navigation = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Registro", href: "/registro_participante", icon: UserPlus },
  { title: "Acceso anfitrión", href: "/anfitrion/login", icon: LogIn },
]

const slides = [
  {
    title: "EA SPORTS FC 26",
    description: "Demuestra quién domina la cancha y llega a la final del torneo.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Rocket League",
    description: "Velocidad, precisión y goles imposibles en una competencia de alto nivel.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Torneo de eSports",
    description: "Forma parte de la próxima generación de competidores y alcanza la cima.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=85",
  },
]

export default function AnfitrionPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <span className="truncate font-semibold">Torneo Gamer</span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={item.href === "/"}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          <Link href="/">
              <LogOut className="size-4" /> Salir
        </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b px-4 sm:px-6">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Inicio</span>
        </header>
        <section className="flex flex-1 flex-col items-center justify-center gap-4  sm:px-20">
          <Card className="w-full max-w-10xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight">TORNEO</CardTitle>
              <CardDescription>
                Elige un juego, inscríbete y demuestra tus habilidades.
              </CardDescription>
            </CardHeader>
          </Card>
          <Carousel className="w-full max-w-12xl" opts={{ loop: true }} autoPlay={5000}>
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.title}>
                  <article
                    className="relative flex min-h-[560px] overflow-hidden rounded-3xl bg-cover bg-center shadow-xl sm:min-h-[680px]"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
                    <div className="relative z-10 flex w-full flex-col justify-end p-8 text-white sm:p-14">
                      <p className="text-sm font-semibold tracking-[0.22em] text-primary-foreground/80">JUEGO DESTACADO</p>
                      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{slide.title}</h1>
                      <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-xl">{slide.description}</p>
                      <Link
                        href="/registro_participante"
                        className="mt-8 w-fit rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85"
                      >
                        Unirse
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-5 border-white/30 bg-black/50 text-white hover:bg-black/70 hover:text-white sm:-left-6" />
            <CarouselNext className="-right-5 border-white/30 bg-black/50 text-white hover:bg-black/70 hover:text-white sm:-right-6" />
          </Carousel>
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
