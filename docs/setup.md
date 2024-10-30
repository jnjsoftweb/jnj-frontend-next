## 기본 설정

```sh
# create next project 설치 옵션 지정
cd C:\JnJ-soft\Projects\internal
npx create-next-app@latest jnj-frontend-next --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm

# shadcn-ui 설치 https://ui.shadcn.com/docs/cli
cd jnj-frontend-next
npx shadcn@latest init -d -y

# github
github -e pushRepo -u jnjsoftweb -n jnj-frontend-next -d "JnJ FronteEnd in NEXT.JS"
```

### .vscode, prettierrc, _doc 복사

```sh
C:\JnJ-soft\Projects\internal\_next_template\_doc
C:\JnJ-soft\Projects\internal\_next_template\.vscode
C:\JnJ-soft\Projects\internal\_next_template\.prettierrc
```


## shadcn-ui

```
# button 컴포넌트 생성
C:\JnJ-soft\Projects\internal\jnj-frontend-next

npx shadcn@latest add button card switch
```

## button 컴포넌트 테스트

> `src/app/(test)/shadcn/button/page.tsx`

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```


```tsx
import { BellRing, Check } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
 
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]
 
type CardProps = React.ComponentProps<typeof Card>
 
export function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}
```

## 개발 서버 실행

```sh
cd C:\JnJ-soft\Projects\internal\jnj-frontend-next
npm run dev
```


### browser 접속

```
http://localhost:3000/shadcn/card
```


## 추가 설정
```sh
# utils module 설치
npm install dotenv axios @apollo/client graphql graphql-tag
```

npm install graphql-tag


```
http://localhost:3007/
```