import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, ArrowLeft, AlignLeft, AlignCenter, AlignRight, Download, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    content: "",
    isDarkMode: false,
    removeWatermark: true,
    isXPost: false,
    textAlign: "center" as "left" | "center" | "right",
    fontFamily: "Inter",
    profilePhoto: null as string | null,
    aspectRatio: "1:1" as "1:1" | "9:16" | "16:9",
    showContentBox: true
  });

  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'removeWatermark' && value === false) {
      setShowPremiumDialog(true);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getPostDimensions = () => {
    switch (formData.aspectRatio) {
      case "9:16": return { width: 315, height: 560 };
      case "16:9": return { width: 560, height: 315 };
      default: return { width: 400, height: 400 };
    }
  };

  const handleDownload = async () => {
    if (postRef.current) {
      try {
        const dataUrl = await toPng(postRef.current, {
          backgroundColor: formData.isDarkMode ? '#000000' : '#ffffff',
          cacheBust: true,
          pixelRatio: 3,
        });
        const link = document.createElement('a');
        link.download = `thready-post-${formData.aspectRatio.replace(':', 'x')}.png`;
        link.href = dataUrl;
        link.click();
        toast({
          title: "Post Downloaded!",
          description: "Your post has been saved successfully.",
        });
      } catch (error) {
        console.error('Error generating image:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading your post. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getAlignmentClass = () => {
    switch (formData.textAlign) {
      case "left": return "text-left";
      case "right": return "text-right";
      default: return "text-center";
    }
  };

  const fontOptions = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Poppins", label: "Poppins" },
    { value: "Playfair Display", label: "Playfair Display" },
    { value: "Merriweather", label: "Merriweather" }
  ];

  const aspectRatioOptions = [
    { value: "1:1", label: "Square (1:1)" },
    { value: "9:16", label: "Portrait (9:16)" },
    { value: "16:9", label: "Landscape (16:9)" }
  ];

  return (
    <SignedIn>
      <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-[#e3e6ee] to-[#c3cfe2]">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-88px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            
            {/* Left Side - Preview */}
            <div className="flex items-center justify-center">
              <div className="relative" style={getPostDimensions()}>
                <div 
                  ref={postRef}
                  className={`w-full h-full rounded-2xl shadow-2xl transition-all duration-500 flex ${formData.isXPost ? 'justify-start' : 'justify-center'} items-center p-8 ${formData.isDarkMode ? '' : 'border-2 border-gray-100'} animate-fade-in`}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: formData.isDarkMode ? '#000000' : '#ffffff' }}
                >
                  {/* Post Content */}
                  {formData.isXPost ? (
                    <div className="w-full flex flex-col items-start">
                      {/* Profile group */}
                      <div className="flex items-center space-x-3 mb-4 px-3">
                        {formData.profilePhoto && (
                          <img 
                            src={formData.profilePhoto} 
                            alt="Profile" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
                          />
                        )}
                        <div>
                          {formData.name && (
                            <h2 className={`text-xl font-bold ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.name}</h2>
                          )}
                          {formData.username && (
                            <p className={`text-sm ${formData.isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{formData.username}</p>
                          )}
                        </div>
                      </div>
                      {/* Content box */}
                      {formData.content && (
                        formData.showContentBox || formData.isDarkMode ? (
                          <div className={`w-full rounded-xl px-5 py-4 ${formData.isDarkMode ? 'bg-black' : 'bg-gray-100'} mt-2`}>
                            <p className={`text-lg leading-relaxed ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: formData.fontFamily }}>{formData.content}</p>
                          </div>
                        ) : (
                          <p className={`w-full text-lg leading-relaxed mt-2 ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: formData.fontFamily }}>{formData.content}</p>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      {/* Profile group */}
                      <div className="flex flex-col items-center mb-4">
                        {formData.profilePhoto && (
                          <img 
                            src={formData.profilePhoto} 
                            alt="Profile" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700 mb-2"
                          />
                        )}
                        {formData.name && (
                          <h2 className={`text-xl font-bold ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.name}</h2>
                        )}
                        {formData.username && (
                          <p className={`text-sm ${formData.isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>@{formData.username}</p>
                        )}
                      </div>
                      {/* Content box */}
                      {formData.content && (
                        formData.showContentBox || formData.isDarkMode ? (
                          <div className={`w-full rounded-xl px-5 py-4 ${formData.isDarkMode ? 'bg-black' : 'bg-gray-100'} mt-2`}>
                            <p className={`text-lg leading-relaxed text-center ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: formData.fontFamily }}>{formData.content}</p>
                          </div>
                        ) : (
                          <p className={`w-full text-lg leading-relaxed text-center mt-2 ${formData.isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: formData.fontFamily }}>{formData.content}</p>
                        )
                      )}
                    </div>
                  )}
                  {/* Watermark - always visible, subtle, bottom right */}
                  <div className="absolute bottom-3 right-4 text-xs opacity-60" style={{ color: formData.isDarkMode ? '#fff' : '#888' }}>
                    Made with Thready
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Input Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md space-y-6 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in delay-200">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Post</h1>
                  <p className="text-gray-600">Fill in the details to generate your post</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Main Inputs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1"
                    />
                    <Input
                      id="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      id="content"
                      placeholder="Write your content"
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={4}
                      className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Dropdown Row for Options */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {/* Aspect Ratio Dropdown */}
                    <div className="flex-1">
                      <Label className="text-xs font-medium text-gray-700 mb-1 block">Aspect Ratio</Label>
                      <Select value={formData.aspectRatio} onValueChange={(value) => handleInputChange('aspectRatio', value)}>
                        <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aspectRatioOptions.map((ratio) => (
                            <SelectItem key={ratio.value} value={ratio.value}>
                              {ratio.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Font Dropdown */}
                    <div className="flex-1">
                      <Label className="text-xs font-medium text-gray-700 mb-1 block">Font</Label>
                      <Select value={formData.fontFamily} onValueChange={(value) => handleInputChange('fontFamily', value)}>
                        <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Text Alignment Dropdown */}
                    <div className="flex-1">
                      <Label className="text-xs font-medium text-gray-700 mb-1 block">Text Align</Label>
                      <Select value={formData.textAlign} onValueChange={(value) => handleInputChange('textAlign', value)} disabled={formData.isXPost}>
                        <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Options - Checkboxes Grouped */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="xPost"
                          checked={formData.isXPost}
                          onCheckedChange={(checked) => {
                            handleInputChange('isXPost', checked);
                            if (checked) {
                              handleInputChange('textAlign', 'left');
                            }
                          }}
                          className="transition-all duration-200"
                        />
                        <Label htmlFor="xPost" className="text-sm font-medium text-gray-700 cursor-pointer">
                          X Handle Post Style
                        </Label>
                      </div>
                      {formData.isXPost && (
                        <div className="space-y-2 pl-6">
                          <Label className="text-sm font-medium text-gray-700">Profile Photo</Label>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              className="transition-all duration-200"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePhotoUpload}
                              className="hidden"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="darkMode"
                          checked={formData.isDarkMode}
                          onCheckedChange={(checked) => handleInputChange('isDarkMode', checked)}
                          className="transition-all duration-200"
                        />
                        <Label htmlFor="darkMode" className="text-sm font-medium text-gray-700 cursor-pointer">
                          Dark Background
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="removeWatermark"
                          checked={formData.removeWatermark}
                          onCheckedChange={(checked) => handleInputChange('removeWatermark', checked)}
                          className="transition-all duration-200"
                        />
                        <Label htmlFor="removeWatermark" className="text-sm font-medium text-gray-700 cursor-pointer">
                          Remove Watermark
                        </Label>
                      </div>
                      {!formData.isDarkMode && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="showContentBox"
                            checked={formData.showContentBox}
                            onCheckedChange={(checked) => handleInputChange('showContentBox', checked)}
                            className="transition-all duration-200"
                          />
                          <Label htmlFor="showContentBox" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Show background box behind text
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-8"
                    size="lg"
                  >
                    Download Post
                    <Download className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Premium Dialog */}
        <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Premium Feature</span>
              </DialogTitle>
              <DialogDescription className="text-center py-4">
                <div className="space-y-4">
                  <div className="text-lg font-semibold text-gray-900">
                    Upgrade to Premium
                  </div>
                  <div className="text-gray-600">
                    Remove watermarks and unlock unlimited high-quality downloads for just <span className="font-bold text-purple-600">$10/month</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="text-sm text-purple-800 font-medium">
                      🚀 Coming Soon!
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      We're working hard to bring you premium features
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Button 
                onClick={() => setShowPremiumDialog(false)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Got it!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SignedIn>
  );
};

export default Dashboard;
