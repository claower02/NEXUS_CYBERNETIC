import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Получение всех постов
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true,
            email: true,
            githubLogin: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Ошибка загрузки постов" }, { status: 500 })
  }
}

// Создание нового поста
export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Неавторизован" }, { status: 401 })
    }

    const { content, code, language, repoName, repoDesc, repoStars, repoLang } = await req.json()

    // Находим пользователя в базе по email
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    // Если это гость и его нет в базе — создадим временную запись
    if (!user && session.user.email === "guest@nexus.io") {
      user = await prisma.user.create({
        data: {
          email: "guest@nexus.io",
          name: "Guest Developer",
          githubLogin: "guest_node"
        }
      })
    }

    if (!user) {
      return NextResponse.json({ 
        error: "Ваш аккаунт еще не синхронизирован с БД. Попробуйте перезайти через GitHub." 
      }, { status: 404 })
    }

    const newPost = await prisma.post.create({
      data: {
        content,
        code,
        language,
        repoName,
        repoDesc,
        repoStars,
        repoLang,
        authorId: user.id
      },
      include: {
        author: true
      }
    })

    return NextResponse.json(newPost)
  } catch (error) {
    console.error("Post Error:", error)
    return NextResponse.json({ error: "Ошибка при создании поста" }, { status: 500 })
  }
}
