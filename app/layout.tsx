// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Theme from "@/app/theme";
import FormularioVeterinaria from "./buscador/FormularioVeterinaria"; // Asegúrate de la ruta correcta

const inter = Inter({ subsets: ["latin"] });

// Define el tipo para la veterinaria
interface Veterinaria {
  nombreDelLocal: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  email: string;
  numero: string;
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const guardarVeterinaria = async (veterinaria: Veterinaria) => {
    try {
      const respuesta = await fetch("http://localhost:3000/veterinarias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(veterinaria),
      });
      if (respuesta.ok) {
        console.log("Veterinaria guardada");
      } else {
        console.error(
          "Error al guardar la veterinaria:",
          await respuesta.text()
        );
      }
    } catch (error) {
      console.error("Error al guardar la veterinaria:", error);
    }
  };

  return (
    <Theme>
      <html lang="en">
        <body className={inter.className}>
          <FormularioVeterinaria onSubmit={guardarVeterinaria} />
          {children}
        </body>
      </html>
    </Theme>
  );
}
