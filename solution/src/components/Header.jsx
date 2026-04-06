function Header({ title, subtitle }) {
  return (
    <header className="mb-8 border-b border-amber-200 pb-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-amber-950 md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-base text-amber-800/90">{subtitle}</p>
    </header>
  );
}

export default Header;
