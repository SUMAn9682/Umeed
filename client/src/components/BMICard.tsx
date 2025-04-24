// BMI Card Component with correct icon and futuristic design
import { Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function BMICard({ height, weight }: { height: number; weight: number }) {
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obese", color: "text-red-500" };
  };

  const category = getBMICategory();

  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-70 border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
      <CardContent className="p-4 flex flex-col items-center justify-center relative">
                
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-full mb-3 ring-1 ring-primary/20 shadow-lg shadow-primary/10">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="text-md font-medium">Body Mass Index</h3>
          
          <div className="mt-1 flex flex-col items-center">
            <p className="text-2xl font-bold">{calculateBMI()}</p>
            <p className={`text-xs font-medium mt-1 ${category.color}`}>
              {category.label}
            </p>
          </div>
          
          {/* Horizontal bar indicator */}
          <div className="w-full h-1 bg-muted mt-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"
              style={{ 
                clipPath: `inset(0 ${100 - Math.min(Math.max(parseFloat(calculateBMI()) * 2, 0), 100)}% 0 0)` 
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}