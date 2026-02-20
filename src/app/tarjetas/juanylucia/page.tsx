<div className={cn(card, "p-6")}>
  <div className={cn(kicker, "text-center")}>Sugiere una canción</div>

  <p className="mt-3 text-sm text-neutral-700 leading-6 text-center">
    ¿Qué canción no puede faltar? Envíanos tu recomendación.
  </p>

  <div className="mt-4 grid gap-3">
    <div>
      <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-700">
        Canción
      </label>
      <input
        value={song.name}
        onChange={(e) => setSong((p) => ({ ...p, name: e.target.value }))}
        className="mt-1 w-full rounded-2xl border border-neutral-900/12 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900/40"
        placeholder="Ej: Perfect"
      />
    </div>

    <div>
      <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-700">
        Artista
      </label>
      <input
        value={song.artist}
        onChange={(e) => setSong((p) => ({ ...p, artist: e.target.value }))}
        className="mt-1 w-full rounded-2xl border border-neutral-900/12 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900/40"
        placeholder="Ej: Ed Sheeran"
      />
    </div>

    <div>
      <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-700">
        Link (opcional)
      </label>
      <input
        value={song.link}
        onChange={(e) => setSong((p) => ({ ...p, link: e.target.value }))}
        className="mt-1 w-full rounded-2xl border border-neutral-900/12 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900/40"
        placeholder="Spotify / YouTube"
      />
    </div>

    <button
      type="button"
      onClick={sendSong}
      className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-3 text-sm font-semibold tracking-[0.16em] uppercase text-white transition hover:bg-neutral-800 active:scale-[0.99]"
      disabled={!song.name.trim()}
    >
      Enviar por WhatsApp
    </button>
  </div>
</div>