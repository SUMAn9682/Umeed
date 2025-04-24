"use client";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/helpers/api"
import { State, City, IState, ICity } from "country-state-city"; // Added proper types
import { 
  Loader2, 
  ShieldCheck, 
  AlertCircle, 
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Droplet,
  Ruler,
  Weight,
  UserCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  age: z.string().min(1, "Age is required").refine(val => !isNaN(Number(val)), {
    message: "Age must be a number",
  }),
  canDonate: z.boolean(),
  address: z.object({
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
  }),
  status: z.enum(["doctor", "medical student", "others"]),
  info: z.object({
    bloodGroup: z.string().min(1, "Blood group is required"),
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const [, setSelectedCity] = useState<ICity | null>(null);
  const [formErrors, setFormErrors] = useState<z.ZodFormattedError<FormData> | null>(null);

  const states = State.getStatesOfCountry("IN");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    canDonate: true,
    address: {
      state: "",
      district: "",
      city: "",
    },
    status: "others",
    info: {
      bloodGroup: "",
      height: "",
      weight: "",
    },
    termsAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData((prev) => {
      if (id.includes(".")) {
        const [parent, child] = id.split(".");

        return {
          ...prev,
          [parent]:
            parent === "address"
              ? { ...prev.address, [child]: inputValue }
              : parent === "info"
              ? { ...prev.info, [child]: inputValue }
              : prev[parent as keyof FormData],
        };
      }

      return {
        ...prev,
        [id]: inputValue,
      };
    });
  };

  const handleStateChange = (stateName: string) => {
    const state = states.find((s) => s.name === stateName);
    setSelectedState(state || null);

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        state: stateName,
        city: "",
      },
    }));
  };

  const handleCityChange = (cityName: string) => {
    if (selectedState?.isoCode) {
      const city = City.getCitiesOfState("IN", selectedState.isoCode).find(
        (c) => c.name === cityName
      );
      setSelectedCity(city || null);

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          city: cityName,
        },
      }));
    }
  };

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setFormErrors(null);
      return true;
    } catch (error) {
      const zodError = error as z.ZodError<FormData>;
      setFormErrors(zodError.format());
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/users/register", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        canDonate: parseInt(formData.age) >= 18,
        address: formData.address,
        status: formData.status,
        info: formData.info,
      });

      if (response.status === 201) {
        toast("Your account has been created. Please log in.")
        router.push("/login");
      }
    } catch (error: unknown) {
      const apiError = error as { response?: { status: number } };
      if (apiError.response?.status === 409) {
        toast.error("Email or phone number already exists")
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get error message
  const getErrorMessage = (path: string): string | undefined => {
    if (!formErrors) return undefined;
    
    try {
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        // @ts-expect-error - We're handling complex nested errors
        return formErrors[parent]?.fields?.[child]?._errors?.[0];
      }
      // @ts-expect-error - We're handling complex error structures
      return formErrors[path]?._errors?.[0];
    } catch {
      return undefined;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 backdrop-blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      
      {/* Grid lines for futuristic effect */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/30" />
          ))}
        </div>
        <div className="grid grid-rows-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-primary/30" />
          ))}
        </div>
      </div>

      <Card className="relative z-10 w-full max-w-lg backdrop-blur-md bg-card/60 shadow-xl border border-border/50 overflow-hidden">
        {/* Glowing effect on card border */}
        <div className="absolute inset-0 border-t border-l rounded-lg border-primary/20 opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-xl" />
        
        <CardHeader className="space-y-4 relative">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-primary/10" />
          <CardTitle className="text-3xl font-bold text-center text-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="text-primary" size={28} />
            <span>Create Account</span>
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Join us and become a potential life-saver
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="name" className="flex items-center gap-1">
                  <User size={14} className="text-primary" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('name') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('name') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('name')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone size={14} className="text-primary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('phone') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('phone') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('phone')}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="age" className="flex items-center gap-1">
                  <Calendar size={14} className="text-primary" />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('age') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('age') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('age')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail size={14} className="text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('email') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('email') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('email')}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 relative">
                <Label className="flex items-center gap-1">
                  <MapPin size={14} className="text-primary" />
                  State
                </Label>
                <select
                  value={formData.address.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className={`w-full h-11 p-2 rounded border transition-all bg-card/50 text-foreground border-border/50 focus:border-primary focus:ring-primary ${
                    getErrorMessage('address.state') ? "border-destructive" : ""
                  }`}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {getErrorMessage('address.state') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('address.state')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="address.district" className="flex items-center gap-1">
                  <MapPin size={14} className="text-primary" />
                  District
                </Label>
                <Input
                  id="address.district"
                  value={formData.address.district}
                  onChange={handleChange}
                  placeholder="Enter District"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('address.district') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('address.district') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('address.district')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="address.city" className="flex items-center gap-1">
                  <MapPin size={14} className="text-primary" />
                  City
                </Label>
                <select
                  value={formData.address.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  disabled={!formData.address.state}
                  className={`w-full h-11 p-2 rounded border transition-all bg-card/50 text-foreground border-border/50 focus:border-primary focus:ring-primary ${
                    getErrorMessage('address.city') ? "border-destructive" : ""
                  } ${!formData.address.state ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <option value="">Select City</option>
                  {selectedState &&
                    City.getCitiesOfState("IN", selectedState.isoCode).map(
                      (city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      )
                    )}
                </select>
                {getErrorMessage('address.city') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('address.city')}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="info.bloodGroup" className="flex items-center gap-1">
                  <Droplet size={14} className="text-primary" />
                  Blood Group
                </Label>
                <select
                  id="info.bloodGroup"
                  value={formData.info.bloodGroup}
                  onChange={handleChange}
                  className={`w-full h-11 p-2 rounded border transition-all bg-card/50 text-foreground border-border/50 focus:border-primary focus:ring-primary ${
                    getErrorMessage('info.bloodGroup') ? "border-destructive" : ""
                  }`}
                >
                  <option value="">Blood Group</option>
                  {[
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                    "Others",
                  ].map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {getErrorMessage('info.bloodGroup') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('info.bloodGroup')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="info.height" className="flex items-center gap-1">
                  <Ruler size={14} className="text-primary" />
                  Height (cm)
                </Label>
                <Input
                  id="info.height"
                  type="number"
                  value={formData.info.height}
                  onChange={handleChange}
                  placeholder="170"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('info.height') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('info.height') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('info.height')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="info.weight" className="flex items-center gap-1">
                  <Weight size={14} className="text-primary" />
                  Weight (kg)
                </Label>
                <Input
                  id="info.weight"
                  type="number"
                  value={formData.info.weight}
                  onChange={handleChange}
                  placeholder="65"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('info.weight') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('info.weight') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('info.weight')}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="status" className="flex items-center gap-1">
                <UserCheck size={14} className="text-primary" />
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full h-11 p-2 rounded border transition-all bg-card/50 text-foreground border-border/50 focus:border-primary focus:ring-primary ${
                  getErrorMessage('status') ? "border-destructive" : ""
                }`}
              >
                <option value="doctor">Doctor</option>
                <option value="medical student">Medical Student</option>
                <option value="others">Others</option>
              </select>
              {getErrorMessage('status') && (
                <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {getErrorMessage('status')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-primary" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('password') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('password') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('password')}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword" className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-primary" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`h-11 pl-3 transition-all border-border/50 focus:border-primary bg-card/50 ${
                    getErrorMessage('confirmPassword') ? "border-destructive" : ""
                  }`}
                />
                {getErrorMessage('confirmPassword') && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {getErrorMessage('confirmPassword')}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 text-sm">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className={`h-4 w-4 rounded border-border text-primary focus:ring-primary ${
                      getErrorMessage('termsAccepted') ? "border-destructive" : ""
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label
                    htmlFor="termsAccepted"
                    className={`text-muted-foreground ${
                      getErrorMessage('termsAccepted') ? "text-destructive" : ""
                    }`}
                  >
                    I agree to the{" "}
                    <Link
                      href={"/"}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={"/"}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            </div>
            {getErrorMessage('termsAccepted') && (
              <p className="text-destructive text-sm flex items-center gap-1 -mt-4">
                <AlertCircle size={12} /> {getErrorMessage('termsAccepted')}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white/80 relative overflow-hidden group"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-30 group-hover:opacity-100 transition-opacity duration-300 group-hover:duration-200 animate-pulse" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="relative">
          <p className="text-sm text-muted-foreground text-center w-full">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;