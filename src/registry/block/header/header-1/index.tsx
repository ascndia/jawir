"use client";
import React, { useState } from 'react';
import { 
  Home, 
  Map, 
  MessageSquare, 
  Search,
  Menu,
  X,
  LogIn,
  LogOut,
  Plus,
  Heart,
  Info,
  FileText,
  Building,
  Calendar,
  UserCog,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { NavLink, MobileNavLink, MenuItems } from './nav-link';


const Header1 = () => {
  const [currentUser, setCurrentUser] = useState<{name: string, email: string, photo?: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            {/* <img 
              src="/lovable-uploads/7a0dfb61-3d66-4e25-81d5-07cfd2354723.png" 
              alt="Bibì Logo" 
              className="w-12 h-12"
            /> */}
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-primary">Jawir</span>
              <span className="text-xs font-semibold text-primary/80 -mt-1">South pole</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/" icon={<Home className="w-5 h-5" />} label="Home" />
          <NavLink href="/map" icon={<Map className="w-5 h-5" />} label="Map" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-primary">
                <Heart className="w-5 h-5" />
                <span className="mt-1">Esplora</span>
              </button>
            </DropdownMenuTrigger>
            <MenuItems  items={[
              { label: 'Cani', icon: <Heart className="mr-2 h-4 w-4" />, href: '/dogs' },
              { label: 'Attività', icon: <Building className="mr-2 h-4 w-4" />, href: '/businesses' },
              { label: 'Eventi', icon: <Calendar className="mr-2 h-4 w-4" />, href: '/events' },
              { label: 'Adozioni', icon: <Heart className="mr-2 h-4 w-4" />, href: '/adoptions' },
              { label: 'Social', icon: <MessageSquare className="mr-2 h-4 w-4" />, href: '/social' },
            ]}/>

          </DropdownMenu>
          {currentUser && (
            <NavLink href="/messages" icon={<MessageSquare className="w-5 h-5" />} label="Messaggi" />
          )}
          <NavLink href="/search" icon={<Search className="w-5 h-5" />} label="Cerca" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-primary">
                <Info className="w-5 h-5" />
                <span className="mt-1">Info</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Informazioni</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/about">
                  <Info className="mr-2 h-4 w-4" /> Chi siamo
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources">
                  <FileText className="mr-2 h-4 w-4" /> Risorse
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {currentUser && (
            <>
              <NavLink 
                href="/profile" 
                icon={
                  <div className="relative">
                    {currentUser.photo ? (
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={currentUser.photo} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <UserCircle className="w-5 h-5 text-primary" />
                    )}
                    <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-green-500" />
                  </div>
                } 
                label="Profilo" 
                highlight={true}
              />
              <NavLink href="/profile/manage" icon={<UserCog className="w-5 h-5" />} label="Gestione" />
            </>
          )}
        </nav>

        {/* Authentication Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          {currentUser ? (
            <>
              <div className="flex items-center mr-2 text-sm">
                <span className="font-medium text-primary">
                  {currentUser.name}
                </span>
                <Badge className="ml-2 bg-green-500 text-[10px]">Online</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button size="sm" asChild>
                <Link href="/add-dog">
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Cane
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Accedi
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrati
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {currentUser && (
            <div className="flex items-center mr-2">
              {currentUser.photo ? (
                <Avatar className="w-6 h-6 mr-1">
                  <AvatarImage src={currentUser.photo} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <UserCircle className="w-5 h-5 mr-1 text-primary" />
              )}
              <Badge className="bg-green-500 text-[10px]">Online</Badge>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          <div className="flex flex-col space-y-2">
            {currentUser && (
              <div className="flex items-center py-2 px-3 mb-2 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  {currentUser.photo ? (
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={currentUser.photo} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserCircle className="w-8 h-8 mr-2 text-primary" />
                  )}
                  <div>
                    <div className="font-medium text-primary">{currentUser.name}</div>
                    <div className="text-xs text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
                <Badge className="ml-auto bg-green-500">Online</Badge>
              </div>
            )}
            
            <MobileNavLink href="/" icon={<Home className="w-5 h-5" />} label="Home" onClick={closeMobileMenu} />
            <MobileNavLink href="/map" icon={<Map className="w-5 h-5" />} label="Mappa" onClick={closeMobileMenu} />
            
            <div className="py-2 px-3 font-medium text-sm text-gray-500">ESPLORA</div>
            <MobileNavLink href="/dogs" icon={<Heart className="w-5 h-5" />} label="Cani" onClick={closeMobileMenu} />
            <MobileNavLink href="/businesses" icon={<Building className="w-5 h-5" />} label="Attività" onClick={closeMobileMenu} />
            <MobileNavLink href="/events" icon={<Calendar className="w-5 h-5" />} label="Eventi" onClick={closeMobileMenu} />
            <MobileNavLink href="/adoptions" icon={<Heart className="w-5 h-5" />} label="Adozioni" onClick={closeMobileMenu} />
            <MobileNavLink href="/social" icon={<MessageSquare className="w-5 h-5" />} label="Social" onClick={closeMobileMenu} />
            
            {currentUser && (
              <MobileNavLink href="/messages" icon={<MessageSquare className="w-5 h-5" />} label="Messaggi" onClick={closeMobileMenu} />
            )}
            
            <MobileNavLink href="/search" icon={<Search className="w-5 h-5" />} label="Cerca" onClick={closeMobileMenu} />
            
            <div className="py-2 px-3 font-medium text-sm text-gray-500">INFORMAZIONI</div>
            <MobileNavLink href="/about" icon={<Info className="w-5 h-5" />} label="Chi siamo" onClick={closeMobileMenu} />
            <MobileNavLink href="/resources" icon={<FileText className="w-5 h-5" />} label="Risorse" onClick={closeMobileMenu} />
            
            {currentUser && (
              <>
                <div className="py-2 px-3 font-medium text-sm text-gray-500">IL MIO ACCOUNT</div>
                <MobileNavLink 
                  href="/profile" 
                  icon={<UserCircle className="w-5 h-5 text-primary" />} 
                  label="Profilo" 
                  onClick={closeMobileMenu}
                  highlight={true}
                />
                <MobileNavLink href="/profile/manage" icon={<UserCog className="w-5 h-5" />} label="Gestione Profilo" onClick={closeMobileMenu} />
              </>
            )}

            <div className="pt-2 border-t">
              {currentUser ? (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { logout(); closeMobileMenu(); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  <Button className="w-full justify-start mt-2" asChild>
                    <Link href="/add-dog" onClick={closeMobileMenu}>
                      <Plus className="w-4 h-4 mr-2" />
                      Aggiungi Cane
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/login" onClick={closeMobileMenu}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Accedi
                    </Link>
                  </Button>
                  <Button className="w-full justify-start mt-2" asChild>
                    <Link href="/register" onClick={closeMobileMenu}>
                      <Plus className="w-4 h-4 mr-2" />
                      Registrati
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header1;