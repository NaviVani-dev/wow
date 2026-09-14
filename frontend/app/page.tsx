import Link from "next/link"
import {
  Home,
  LayoutDashboard,
  UserPlus,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
  { title: "Panel", href: "/anfitrion", icon: LayoutDashboard },
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

export default function HomePage() {
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
          Plataforma de torneos 
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
         <header className="flex h-12 items-center gap-2 border-b px-4 sm:px-6">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Inicio</span>
        </header>
        <section className="flex flex-1 flex-col items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
           <div className="w-full max-w-7xl">

           <Card className="w-full max-w-10xl mb-8">
            <CardHeader className="space-y-4 py-4">
              <CardTitle className="text-3xl md:text-3xl font-extrabold tracking-tight leading-tight">
                ¡Tu Próxima Victoria Empieza Aquí!
              </CardTitle>
              <CardDescription className="space-y-4 text-base md:text-lg leading-relaxed">
                <h2 className="text-md font-semibold text-foreground">
                  ¿Crees tener lo necesario para llegar a la cima? 🔥
                </h2>
                <p className="max-w-4xl text-muted-foreground text-lg">
                  Entra al torneo, demuestra tus habilidades y enfréntate a jugadores
                  que buscan la victoria igual que tú. Cada partida es una oportunidad
                  para destacar, superar tus límites y conquistar el primer lugar.
                </p>
                <p className="text-xl font-bold tracking-wide text-foreground my-6">
                  Compite. Domina. Gana. 
                </p>
                <p className="font-semibold text-foreground text-md">
                  ¡Inscríbete y demuestra de qué estás hecho!
                </p>
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="w-full max-w-10xl my-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Juegos Participando
            </h2>
          </div>

            <Carousel className="mt-4 w-full" opts={{ loop: true }} autoPlay={5000}>
              <CarouselContent className="-ml-4">
                {slides.map((slide) => (
                  <CarouselItem
                    key={slide.title}
                    className="basis-1/3 pl-4"
                  >
                    <article
                      className="relative flex min-h-140 overflow-hidden rounded-3xl bg-cover bg-center shadow-xl sm:min-h-170"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/10" />

                      <div className="relative z-10 flex w-full flex-col justify-end p-8 text-white sm:p-14">
                        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
                          {slide.title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-xl">
                          {slide.description}
                        </p>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>


      </div>
    </section>
  </SidebarInset>
 </SidebarProvider>
  )
}
