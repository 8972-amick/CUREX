import prisma from "../prismaClient.js";

export const getChats = async (req, res) => {
    try {   
        const userId = parseInt(req.params.userId);
        const chats = await prisma.chat.findMany({
            where: {
                OR: []
            },
            include: {
                messages: { orderBy: { createdAt: 'desc' }, take: 1 },
                users: true
            }
        }); 
        const filteredChats = chats.filter(chat => chat.users.some(user => user.id === userId));
        res.status(200).json({ success: true, chats: filteredChats });
    } catch (error) {
        console.error("🔥 Prisma Error:", error);
        res.status(500).json({  message: "Internal server error", success: false });
    }       
};

