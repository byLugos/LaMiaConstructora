export default function Title({
  children,
  color = '#454181',  // Color por defecto
  className = ''
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <h1
      className={`text-4xl md:text-6xl font-extrabold ${className}`}
      style={{ color }}  // Aplicar color dinámicamente
    >
      {children}
    </h1>
  );
}
