import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, Camera, Upload, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Camera", icon: Camera, href: "#camera" },
    { name: "Upload", icon: Upload, href: "#upload" },
    { name: "Dashboard", icon: BarChart3, href: "#dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-eco-accent rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-eco-accent bg-clip-text text-transparent">
              SahiBin
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground hover:bg-eco-light transition-colors"
                onClick={() => {
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200 ease-in-out",
            isMenuOpen ? "max-h-48 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-2 pt-4 border-t border-border">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="flex items-center justify-start space-x-2 text-muted-foreground hover:text-foreground hover:bg-eco-light w-full"
                onClick={() => {
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;