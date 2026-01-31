export type Invitation = {
  id: string;
  title: string;
  style: string;
  image: string; // URL (Pinterest o lo que sea)
  description: string;
};

export const INVITATIONS: Invitation[] = [
  {
    id: "editorial-sunset",
    title: "Editorial Sunset",
    style: "Editorial • Fotografía",
    description: "Banner ancho estilo revista, limpio y moderno.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "minimal-white",
    title: "Minimal White",
    style: "Minimal • Clean",
    description: "Fondo blanco, tipografía elegante, muy premium.",
    image:
      "https://images.unsplash.com/photo-1523437237164-d442d57cc3c9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "paper-mood",
    title: "Paper Mood",
    style: "Papel • Moderno",
    description: "Look editorial con recortes tipo papel.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "black-white",
    title: "Black & White",
    style: "B&N • Editorial",
    description: "Blanco y negro con estética fashion.",
    image:
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "soft-romance",
    title: "Soft Romance",
    style: "Romántico • Claro",
    description: "Suave, minimal, perfecto para fotos cálidas.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "nature-lovers",
    title: "Nature Lovers",
    style: "Natural • Editorial",
    description: "Natural, elegante, con vibra outdoor.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  },
];

export function getInvitationById(id: string) {
  return INVITATIONS.find((x) => x.id === id);
}
