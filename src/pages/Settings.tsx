import { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@medcare.com",
    phone: "+1 (555) 123-4567",
    birthDate: "1985-06-15",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    bloodType: "O+",
    height: "5'6\"",
    weight: "145 lbs"
  });

  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    appointmentReminders: true,
    healthInsights: true,
    emergencyAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
    smsNotifications: true,
    pushNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    shareDataWithDoctors: true,
    anonymousAnalytics: true,
    healthInsightsSharing: false,
    thirdPartyIntegrations: false
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    units: "imperial",
    theme: "system"
  });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof notifications] }));
  };

  const handlePrivacyToggle = (setting: string) => {
    setPrivacy(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof privacy] }));
  };

  const handlePreferenceChange = (setting: string, value: string) => {
    setPreferences(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button className="gap-2">
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and medical information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date of Birth</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => handleProfileUpdate('birthDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={profile.bloodType} onValueChange={(value) => handleProfileUpdate('bloodType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={profile.height}
                    onChange={(e) => handleProfileUpdate('height', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={profile.weight}
                    onChange={(e) => handleProfileUpdate('weight', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={(e) => handleProfileUpdate('emergencyContact', e.target.value)}
                  placeholder="Name - Phone Number"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Health Reminders</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Medication Reminders</h5>
                      <p className="text-sm text-muted-foreground">Get notified when it's time to take your medications</p>
                    </div>
                    <Switch
                      checked={notifications.medicationReminders}
                      onCheckedChange={() => handleNotificationToggle('medicationReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Appointment Reminders</h5>
                      <p className="text-sm text-muted-foreground">Receive reminders about upcoming appointments</p>
                    </div>
                    <Switch
                      checked={notifications.appointmentReminders}
                      onCheckedChange={() => handleNotificationToggle('appointmentReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Health Insights</h5>
                      <p className="text-sm text-muted-foreground">Get personalized health tips and insights</p>
                    </div>
                    <Switch
                      checked={notifications.healthInsights}
                      onCheckedChange={() => handleNotificationToggle('healthInsights')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Emergency Alerts</h5>
                      <p className="text-sm text-muted-foreground">Critical health alerts and emergency notifications</p>
                    </div>
                    <Switch
                      checked={notifications.emergencyAlerts}
                      onCheckedChange={() => handleNotificationToggle('emergencyAlerts')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Communication</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Weekly Reports</h5>
                      <p className="text-sm text-muted-foreground">Summary of your health activities each week</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={() => handleNotificationToggle('weeklyReports')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Marketing Emails</h5>
                      <p className="text-sm text-muted-foreground">Promotional content and new feature announcements</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">SMS Notifications</h5>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Push Notifications</h5>
                      <p className="text-sm text-muted-foreground">Browser and mobile app notifications</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Data Sharing
              </CardTitle>
              <CardDescription>Control how your health data is shared and used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Share Data with Healthcare Providers</h5>
                    <p className="text-sm text-muted-foreground">Allow your doctors to access your health data for better care</p>
                  </div>
                  <Switch
                    checked={privacy.shareDataWithDoctors}
                    onCheckedChange={() => handlePrivacyToggle('shareDataWithDoctors')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Anonymous Analytics</h5>
                    <p className="text-sm text-muted-foreground">Help improve our services with anonymized usage data</p>
                  </div>
                  <Switch
                    checked={privacy.anonymousAnalytics}
                    onCheckedChange={() => handlePrivacyToggle('anonymousAnalytics')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Health Insights Sharing</h5>
                    <p className="text-sm text-muted-foreground">Share insights to help research and improve health outcomes</p>
                  </div>
                  <Switch
                    checked={privacy.healthInsightsSharing}
                    onCheckedChange={() => handlePrivacyToggle('healthInsightsSharing')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Third-Party Integrations</h5>
                    <p className="text-sm text-muted-foreground">Allow integration with fitness trackers and health apps</p>
                  </div>
                  <Switch
                    checked={privacy.thirdPartyIntegrations}
                    onCheckedChange={() => handlePrivacyToggle('thirdPartyIntegrations')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Display & Localization
              </CardTitle>
              <CardDescription>Customize your experience and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => handlePreferenceChange('dateFormat', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="units">Units</Label>
                  <Select value={preferences.units} onValueChange={(value) => handlePreferenceChange('units', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (lbs, °F)</SelectItem>
                      <SelectItem value="metric">Metric (kg, °C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your account security and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Password & Security</h4>
                <Button variant="outline">Change Password</Button>
                <Button variant="outline">Enable Two-Factor Authentication</Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Data Management</h4>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="gap-2">
                    Request Data Deletion
                  </Button>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-destructive/20">
                <h4 className="font-semibold text-destructive">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}