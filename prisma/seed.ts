import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const globalTemplate = await prisma.template.create({
    data: {
      name: "Computer budget",
      description:
        "A budget for a computer purchase, including components and peripherals.",
      userId: null,
      isGlobal: true,
      fields: {
        createMany: {
          data: [
            {
              key: "NAME",
              description: "The custom name given to the computer",
              type: "text",
              required: true,
            },
            {
              key: "APPS",
              description: "Required applications for the computer",
              type: "text",
              required: false,
            },
            {
              key: "VISUAL",
              description:
                "Visual aspects of the computer (ex: RGB, color scheme)",
              type: "text",
              required: false,
            },
            {
              key: "GAMES",
              description: "The purpose of the computer (e.g., gaming, work)",
              type: "text",
              required: false,
            },
            {
              key: "SIZE",
              description: "Tamanho do computador ou gabinete",
              type: "text",
              required: false,
            },
            {
              key: "CPU",
              description: "Processador",
              type: "text",
              required: false,
            },
            {
              key: "PSU",
              description: "Fonte de alimentação",
              type: "text",
              required: false,
            },
            {
              key: "MOTHERBOARD",
              description: "Placa-mãe",
              type: "text",
              required: false,
            },
            {
              key: "RAM",
              description: "Memória RAM",
              type: "text",
              required: false,
            },
            {
              key: "STORAGE",
              description: "Armazenamento",
              type: "text",
              required: false,
            },
            {
              key: "COOLER",
              description: "Cooler do processador",
              type: "text",
              required: false,
            },
            {
              key: "FANS",
              description: "Refrigeração (fans)",
              type: "text",
              required: false,
            },
            {
              key: "TOTAL",
              description: "Valor total",
              type: "text",
              required: false,
            },
            {
              key: "TOTAL_INSTALLMENTS",
              description: "Valor total em 12x",
              type: "text",
              required: false,
            },
            {
              key: "GPU",
              description: "Placa de vídeo",
              type: "text",
              required: false,
            },
            {
              key: "CASE",
              description: "Gabinete",
              type: "text",
              required: false,
            },
            {
              key: "ADDITIONALS",
              description: "Adicionais",
              type: "text",
              required: false,
            },
          ],
        },
      },
    },
  });

  await prisma.upload.create({
    data: {
      url: `/global-templates/0.pdf`,
      userId: null,
      template: {
        connect: {
          id: globalTemplate.id,
        },
      },
    },
  });
}

void main();
