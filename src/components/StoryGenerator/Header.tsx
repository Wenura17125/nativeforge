import React, { useState } from "react";
import { Moon, Sun, Menu, Home, BookOpen, Info, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

interface HeaderProps {
  title?: string;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Header = ({
  title = "NarrativeForge",
  isDarkMode = false,
  onThemeToggle = () => {},
}: HeaderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    isDarkMode ? "dark" : "light",
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    onThemeToggle();
  };

  return (
    <header className="w-full h-20 px-6 flex items-center justify-between border-b bg-background sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <span className="bg-primary text-primary-foreground p-2 rounded-md font-bold">
            NF
          </span>
          <h1 className="text-2xl font-bold hidden sm:block">{title}</h1>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/generator">Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/examples">Examples</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/generator" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Generator</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/examples" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Examples</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </Button>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
