"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { obtenerSesion, type Anfitrion } from "@/lib/api";

export function useAnfitrionAuth() {
  const router = useRouter();
  const [anfitrion, setAnfitrion] = useState<Anfitrion | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    void obtenerSesion()
      .then((response) => setAnfitrion(response.anfitrion))
      .catch(() => router.replace("/anfitrion/login"))
      .finally(() => setCheckingSession(false));
  }, [router]);

  return { anfitrion, checkingSession };
}
