import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export type AdminStatsCardProps = {
  icon: ReactNode;
  label: string;
  value: number | string;
  iconClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
};

const AdminStatsCard = ({
  icon,
  label,
  value,
  iconClassName = "",
  valueClassName = "",
  labelClassName = "",
}: AdminStatsCardProps): React.ReactElement => (
  <Card>
    <CardContent className="p-3 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center">
        <span className={iconClassName + " mb-2 md:mb-0 md:mr-3"}>{icon}</span>
        <div>
          <p
            className={
              "text-xs md:text-sm font-medium text-gray-600 " + labelClassName
            }
          >
            {label}
          </p>
          <p
            className={
              "text-lg md:text-2xl font-bold text-gray-900 " + valueClassName
            }
          >
            {value}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AdminStatsCard;
