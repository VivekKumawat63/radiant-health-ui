import { useState } from "react";
import { Search, MapPin, Star, Clock, Phone, Calendar, Filter, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      subSpecialty: "Interventional Cardiology",
      rating: 4.9,
      reviews: 324,
      experience: "15+ years",
      location: "Downtown Medical Center",
      distance: "2.3 miles",
      nextAvailable: "Tomorrow 2:00 PM",
      languages: ["English", "Spanish"],
      image: "/placeholder-doctor-1.jpg",
      about: "Specialized in minimally invasive cardiac procedures with extensive experience in complex heart conditions.",
      education: ["Harvard Medical School", "Johns Hopkins Residency"],
      certifications: ["Board Certified Cardiologist", "Interventional Cardiology Fellowship"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      subSpecialty: "Preventive Medicine",
      rating: 4.8,
      reviews: 187,
      experience: "12+ years",
      location: "Wellness Medical Group",
      distance: "1.8 miles",
      nextAvailable: "Today 4:30 PM",
      languages: ["English", "Mandarin"],
      image: "/placeholder-doctor-2.jpg",
      about: "Focus on comprehensive primary care with emphasis on preventive health and wellness optimization.",
      education: ["Stanford Medical School", "UCSF Internal Medicine"],
      certifications: ["Board Certified Internal Medicine", "Preventive Medicine Certification"]
    },
    {
      id: 3,
      name: "Dr. Lisa Rodriguez",
      specialty: "Endocrinology",
      subSpecialty: "Diabetes & Metabolism",
      rating: 4.7,
      reviews: 156,
      experience: "10+ years",
      location: "Metro Health Specialists",
      distance: "3.1 miles",
      nextAvailable: "Friday 10:00 AM",
      languages: ["English", "Spanish", "Portuguese"],
      image: "/placeholder-doctor-3.jpg",
      about: "Expert in diabetes management, thyroid disorders, and metabolic health optimization.",
      education: ["UCLA Medical School", "Mayo Clinic Fellowship"],
      certifications: ["Board Certified Endocrinologist", "Diabetes Education Specialist"]
    },
    {
      id: 4,
      name: "Dr. James Park",
      specialty: "Dermatology",
      subSpecialty: "Cosmetic & Medical Dermatology",
      rating: 4.9,
      reviews: 298,
      experience: "18+ years",
      location: "Skin Health Institute",
      distance: "4.2 miles",
      nextAvailable: "Next Week",
      languages: ["English", "Korean"],
      image: "/placeholder-doctor-4.jpg",
      about: "Comprehensive dermatological care combining medical treatment with cosmetic enhancement procedures.",
      education: ["Johns Hopkins Medical School", "NYU Dermatology Residency"],
      certifications: ["Board Certified Dermatologist", "Mohs Surgery Fellowship"]
    },
    {
      id: 5,
      name: "Dr. Emily Thompson",
      specialty: "Psychiatry",
      subSpecialty: "Adult & Adolescent Psychiatry",
      rating: 4.8,
      reviews: 203,
      experience: "8+ years",
      location: "Mental Wellness Center",
      distance: "2.7 miles",
      nextAvailable: "Tomorrow 11:00 AM",
      languages: ["English", "French"],
      image: "/placeholder-doctor-5.jpg",
      about: "Comprehensive mental health care with focus on anxiety, depression, and behavioral health.",
      education: ["Yale Medical School", "Mass General Psychiatry"],
      certifications: ["Board Certified Psychiatrist", "Cognitive Behavioral Therapy Certified"]
    }
  ];

  const specialties = [
    "All Specialties",
    "Cardiology",
    "Internal Medicine", 
    "Endocrinology",
    "Dermatology",
    "Psychiatry",
    "Orthopedics",
    "Gynecology",
    "Pediatrics"
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.subSpecialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === "All Specialties" || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Find Doctors</h1>
        <p className="text-muted-foreground">Connect with healthcare professionals in your area</p>
      </div>

      {/* Search and Filters */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors, specialties, conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredDoctors.length} doctors near you
        </p>
        <Select defaultValue="rating">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="distance">Closest</SelectItem>
            <SelectItem value="availability">Next Available</SelectItem>
            <SelectItem value="experience">Most Experience</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="health-card overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Doctor Info */}
                <div className="lg:col-span-2 flex gap-4">
                  <Avatar className="w-20 h-20 flex-shrink-0">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground">{doctor.subSpecialty}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span>({doctor.reviews} reviews)</span>
                      </div>
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location} • {doctor.distance}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability & Actions */}
                <div className="lg:col-span-2 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">About</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {doctor.about}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-success" />
                      <span className="text-success font-medium">
                        Next available: {doctor.nextAvailable}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button size="sm" className="flex-1 gap-2">
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Specialists */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Featured Specialists
          </CardTitle>
          <CardDescription>Top-rated doctors in high-demand specialties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.slice(0, 3).map((doctor) => (
              <div key={`featured-${doctor.id}`} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="bg-gradient-secondary text-white">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{doctor.name}</h4>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{doctor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{doctor.distance}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}