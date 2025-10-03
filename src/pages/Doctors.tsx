import { useState } from "react";
import { Search, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch verified doctors from doctor_profiles table
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['verified-doctors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctor_profiles')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone
          )
        `)
        .eq('verified_status', 'verified');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doctor => {
    const profile = doctor.profiles as any;
    const matchesSearch = profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specializations?.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Find Doctors</h1>
        <p className="text-muted-foreground">Connect with healthcare professionals in your area</p>
      </div>

      {/* Search */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Doctor Listings */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading doctors...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <Card className="health-card">
          <CardContent className="py-12 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Doctors Available</h3>
            <p className="text-muted-foreground">
              {doctors.length === 0 
                ? "No doctors have registered yet. Please check back later."
                : "No doctors match your search. Try different keywords."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => {
            const profile = doctor.profiles as any;
            return (
              <Card key={doctor.id} className="health-card hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary">
                          {profile?.full_name?.charAt(0) || 'D'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">Dr. {profile?.full_name || 'Unknown'}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {doctor.rating > 0 ? `⭐ ${doctor.rating}` : 'New'}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {doctor.experience_years} yrs exp
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {doctor.specializations?.slice(0, 2).map((spec: string) => (
                          <span key={spec} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                        {doctor.specializations?.length > 2 && (
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            +{doctor.specializations.length - 2}
                          </span>
                        )}
                      </div>
                      
                      {doctor.clinic_address && (
                        <p className="text-sm text-muted-foreground flex items-start gap-1">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{doctor.clinic_address}</span>
                        </p>
                      )}
                      
                      {doctor.consultation_fee && (
                        <p className="text-sm font-semibold">
                          Consultation Fee: ${doctor.consultation_fee}
                        </p>
                      )}
                      
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        {doctor.teleconsult_available && (
                          <span className="flex items-center gap-1">
                            📹 Teleconsult
                          </span>
                        )}
                        {doctor.languages?.length > 0 && (
                          <span>
                            💬 {doctor.languages.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {profile?.email && (
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
