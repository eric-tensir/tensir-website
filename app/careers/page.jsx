import { Shell } from "../components/site";
import { CareersContent } from "./careers-client";

export const metadata = { title: "Careers — Tensir" };

export default function CareersPage() {
  return (
    <Shell>
      <CareersContent />
    </Shell>
  );
}
