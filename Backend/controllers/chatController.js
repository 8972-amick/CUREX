import prisma from "../db/prisma.js";

export const getChats = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        users: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 50,
          include: {
            sender: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("🔥 Prisma Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const createOrGetChat = async (req, res) => {
  try {
    const { userIds, name } = req.body;

    if (!Array.isArray(userIds) || userIds.length < 2) {
      return res.status(400).json({ success: false, message: "Provide at least two user IDs" });
    }

    const orderedUserIds = [...new Set(userIds)].sort((a, b) => a - b);

    const existingChat = await prisma.chat.findFirst({
      where: {
        AND: orderedUserIds.map((id) => ({ users: { some: { userId: id } } })),
      },
      include: {
        users: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          include: { sender: { select: { id: true, name: true } } },
        },
      },
    });

    if (existingChat) {
      return res.status(200).json({ success: true, chat: existingChat });
    }

    const chat = await prisma.chat.create({
      data: {
        name: name || null,
        users: {
          create: orderedUserIds.map((id) => ({ user: { connect: { id } } })),
        },
      },
      include: {
        users: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    res.status(201).json({ success: true, chat });
  } catch (error) {
    console.error("🔥 Prisma Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getMessages = async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: { select: { id: true, name: true } },
      },
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("🔥 Prisma Error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
