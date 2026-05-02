import { Construction } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

const Placeholder = ({ title, description }: Props) => {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-10 text-center shadow-card">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-elegant">
          <Construction className="h-5 w-5" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-3 text-muted-foreground">
          {description ?? "This section is coming soon. Check back shortly!"}
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
