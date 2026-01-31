"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", search);
  };

  const menuItems = [
    { href: "/lonuevo", label: "Lo nuevo" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/clientes", label: "Clientes felices" },
    { href: "/acercadenosotros", label: "Acerca de nosotros" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-30 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img src="/bs.png" alt="ChillPets Logo" className="h-20 md:h-24" />
        </Link>

        {/* MENÚ DESKTOP */}
        <ul className="hidden items-center space-x-6 text-lg font-medium text-black md:flex">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative group transition"
              >
                {item.label}
                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-pink-500 transition-all duration-300 group-hover:left-0 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT DESKTOP */}
        <div className="hidden items-center space-x-5 md:flex">
          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-full border border-black/10 px-3 py-1"
          >
            <FaSearch className="mr-2 text-black" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar"
              className="bg-transparent text-sm text-black outline-none"
            />
          </form>

          <IconLink href="/cart">
            <ShoppingCart size={18} />
          </IconLink>
          <IconLink href="/login">
            <LogIn size={18} />
          </IconLink>
          <IconLink href="/register">
            <UserPlus size={18} />
          </IconLink>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="space-y-6 px-6 py-6">
            {/* SEARCH MOBILE */}
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-full border border-black/10 px-4 py-2"
            >
              <FaSearch className="mr-2 text-black" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar"
                className="w-full bg-transparent text-sm text-black outline-none"
              />
            </form>

            {/* LINKS */}
            <ul className="space-y-4 text-lg font-medium">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-black/5 pb-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ICONS */}
            <div className="flex gap-4 pt-4">
              <IconLink href="/cart">
                <ShoppingCart size={20} />
              </IconLink>
              <IconLink href="/login">
                <LogIn size={20} />
              </IconLink>
              <IconLink href="/register">
                <UserPlus size={20} />
              </IconLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function IconLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/5"
    >
      {children}
    </Link>
  );
}
