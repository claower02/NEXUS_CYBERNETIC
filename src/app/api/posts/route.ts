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
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден в БД" }, { status: 404 })
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
