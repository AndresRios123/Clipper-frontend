type BadgeVariant = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

type BadgeProps = {
  variant: BadgeVariant;
  children: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  in_progress: "bg-indigo-50 text-indigo-700 border-indigo-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const variantLabels: Record<BadgeVariant, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  in_progress: "En proceso",
  completed: "Completada",
  cancelled: "Cancelada",
};

const Badge = ({ variant, children }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-0.5 border ${variantStyles[variant]}`}
    >
      {children || variantLabels[variant]}
    </span>
  );
};

export default Badge;
