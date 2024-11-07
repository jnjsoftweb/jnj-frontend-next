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
import { GQL_USER_BY_ID, GQL_ALL_USERS } from '@/queries/gql/youtube';
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
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetchGraphql({
          query: GQL_ALL_USERS
        });
        console.log('Users response:', response);
        if (response?.youtubeAllUsers) {
          const currentUserId = localStorage.getItem('userId');
          const otherUsers = response.youtubeAllUsers.filter(
            (u: UserInfo) => u.userId !== currentUserId
          ).map(user => ({
            ...user,
            thumbnail: user.thumbnail || `/images/${user.userId}.png`
          }));
          setAllUsers(otherUsers);
        }
      } catch (error) {
        console.error('사용자 목록 조회 실패:', error);
      }
    };

    if (isDropdownOpen) {
      fetchAllUsers();
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userId') {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = async () => {
    try {
      const selectedUser = allUsers.find(u => u.userId === selectedUserId);
      if (!selectedUser) {
        alert('사용자를 선택해주세요.');
        return;
      }

      if (selectedUser.password !== password) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      localStorage.setItem('userId', selectedUserId);
      setUser(selectedUser);
      setPassword('');
      setSelectedUserId('');
      setIsDropdownOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
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
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  {user ? (
                    <img
                      src={user.thumbnail}
                      alt={user.name}
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={() => setIsDropdownOpen(true)}
                    />
                  ) : (
                    <Button variant="ghost" size="icon">
                      <User className="h-6 w-6" />
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <div className="p-2 space-y-4">
                    {allUsers.map((u) => (
                      <div key={u.userId} className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                        <img
                          src={u.thumbnail}
                          alt={u.userId}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = `/images/${u.userId}.png`;
                          }}
                        />
                        <span className="flex-1">{u.userId}</span>
                        <Input
                          type="password"
                          placeholder="비밀번호"
                          value={selectedUserId === u.userId ? password : ''}
                          onChange={(e) => {
                            setSelectedUserId(u.userId);
                            setPassword(e.target.value);
                          }}
                          className="w-24"
                        />
                        <Button className="w-full" onClick={handleLogin}>
                          확인
                        </Button>
                      </div>
                    ))}
                  </div>
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
