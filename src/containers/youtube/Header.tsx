import { useState, useEffect } from 'react';
import {
  Search,
  Menu,
  Video,
  User,
  ArrowLeft,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchGraphql } from '@/service/fetchData';
import { GQL_USER_BY_ID } from '@/queries/gql/youtube';
import Link from 'next/link';
import { Database, Download } from 'lucide-react';

interface UserInfo {
  userId: string;
  name: string;
  email: string;
  thumbnail: string;
  password: string;
}

interface HeaderProps {
  onMenuClick: () => void;
  isExpandedSidebar: boolean;
  setIsExpandedSidebar: (expanded: boolean) => void;
}

export function Header({
  onMenuClick,
  isExpandedSidebar,
  setIsExpandedSidebar,
}: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetchGraphql({
          query: GQL_USER_BY_ID,
          variables: { userId },
        });

        if (response.youtubeUserById) {
          const img = new Image();
          img.onload = () => {
            setUser(response.youtubeUserById);
            setLoading(false);
          };
          img.onerror = () => {
            console.error('썸네일 이미지를 불러올 수 없습니다');
            setUser({
              ...response.youtubeUserById,
              thumbnail: `/images/${response.youtubeUserById.userId}.png`,
            });
            setLoading(false);
          };
          img.src = response.youtubeUserById.thumbnail;
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetchGraphql({
        query: GQL_USER_BY_ID,
        variables: { userId: loginForm.userId },
      });

      console.log('Login response:', response);

      if (!response.youtubeUserById) {
        alert('존재하지 않는 사용자입니다.');
        return;
      }

      console.log('Password check:', {
        input: loginForm.password,
        stored: response.youtubeUserById.password,
      });

      if (response.youtubeUserById.password !== loginForm.password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 로그인 성공
      localStorage.setItem('userId', loginForm.userId);
      setUser(response.youtubeUserById);
      setLoginForm({ userId: '', password: '' });
      setIsDropdownOpen(false);

      // 이미지 로딩 체크
      const img = new Image();
      img.onerror = () => {
        console.error('썸네일 이미지를 불러올 수 없습니다');
        setUser((prev) => ({
          ...prev!,
          thumbnail: `/images/${prev!.userId}.png`,
        }));
      };
      img.src = response.youtubeUserById.thumbnail;
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="flex items-center justify-between p-4">
        {isSearchVisible ? (
          <div className="flex items-center w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchVisible(false)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Input className="flex-1 ml-2" placeholder="검색" type="search" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    setIsExpandedSidebar(!isExpandedSidebar);
                  } else {
                    onMenuClick();
                  }
                }}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold hidden sm:inline-block">
                  YouTube
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl ml-auto">
              <Input className="flex-1" placeholder="Search" type="search" />
              <Button size="icon" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchVisible(true)}
              >
                <Search className="h-6 w-6" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {user ? (
                    <img
                      src={user.thumbnail}
                      alt={user.name}
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLoginFormVisible(true)}
                    >
                      <User className="h-6 w-6" />
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {user ? (
                    <>
                      <div className="px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>로그아웃</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <div className="p-2 space-y-2">
                      <Input
                        placeholder="사용자 ID"
                        value={loginForm.userId}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            userId: e.target.value,
                          })
                        }
                      />
                      <Input
                        type="password"
                        placeholder="비밀번호"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                      />
                      <Button className="w-full" onClick={handleLogin}>
                        확인
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/youtube/settings/user">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>User</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/youtube/settings/database">
                    <DropdownMenuItem>
                      <Database className="mr-2 h-4 w-4" />
                      <span>Database</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/youtube/settings/download">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
