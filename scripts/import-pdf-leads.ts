import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LeadData {
  name: string;
  email: string | null;
  phone: string;
  age: string | null;
  level: string;
  mode: string;
  status: "NEW";
  source: string;
  notes: string;
  createdAt: Date;
}

const leadsToImport: LeadData[] = [
  {
    name: "Kamal Saini Kamal Saini",
    email: "kkchessacademy@gmail.com",
    phone: "8764245635",
    age: "30",
    level: "Advanced",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "fide-rated",
    createdAt: new Date("2025-09-10T19:40:01"),
  },
  {
    name: "Diva Ritu",
    email: "ritika479@gmail.com",
    phone: "7030893504",
    age: "6",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "complete-beginner",
    createdAt: new Date("2025-10-23T00:06:31"),
  },
  {
    name: "Manohar Gabria Shewaram",
    email: "msgabria@gmail.com",
    phone: "7020332257",
    age: "56",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "some-knowledge",
    createdAt: new Date("2025-11-16T11:25:39"),
  },
  {
    name: "K. T. Saathvik IniyanKeerthana",
    email: "tamizhiniyankeerthana.aparna@gmail.com",
    phone: "8838406715",
    age: "4.5",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "complete-beginner",
    createdAt: new Date("2025-11-22T14:51:02"),
  },
  {
    name: "Ivaan Gupta Kumar Gupta",
    email: "jeetendra.gupta@yahoo.com",
    phone: "12488850946",
    age: "10",
    level: "Intermediate",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "intermediate",
    createdAt: new Date("2025-12-06T10:35:19"),
  },
  {
    name: "Sudaarshan Balraj",
    email: "balrajvit@gmail.com",
    phone: "919894784932",
    age: "12",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "complete-beginner",
    createdAt: new Date("2025-12-27T12:16:51"),
  },
  {
    name: "Dilip Maruthi",
    email: "kkrdb1997@gmail.com",
    phone: "8123022212",
    age: "26",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "Some Knowledge",
    createdAt: new Date("2026-01-04T07:24:56"),
  },
  {
    name: "ANVITH E E BALAKRISHNA",
    email: "balakrishna.vit0002@gmail.com",
    phone: "N/A",
    age: "8",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "some-knowledge",
    createdAt: new Date("2026-01-13T08:56:58"),
  },
  {
    name: "amit goga",
    email: "amit_email@yahoo.com",
    phone: "98144923292",
    age: "12",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-01-16T02:53:43"),
  },
  {
    name: "GARGI KUMARI RAKESH KUMAR.",
    email: "rakeshyaso15101979@gmail.com",
    phone: "7989494265",
    age: "10",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-03-05T19:57:34"),
  },
  {
    name: "Kilu Ani",
    email: "anishpv02@gmail.com",
    phone: "9900514272",
    age: "18",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-03-19T09:56:17"),
  },
  {
    name: "tanmaya M premila",
    email: "premi_ms@yahoo.co.in",
    phone: "9940957978",
    age: "9",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-03-22T13:40:35"),
  },
  {
    name: "Varsha J Kavitha M",
    email: "kavitha.moorthy2015@gmail.com",
    phone: "9880210066",
    age: "10",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "basic",
    createdAt: new Date("2026-03-23T20:38:31"),
  },
  {
    name: "Vaibhav Narayan Gupta Dr Aditya vikram",
    email: "adityavikram008@gmail.com",
    phone: "9718235132",
    age: "11",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-04-03T10:32:41"),
  },
  {
    name: "Aarna tripathi Ragini mishra",
    email: "rag.ragini1991@gmail.com",
    phone: "7897133606",
    age: "8",
    level: "Intermediate",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "intermediate",
    createdAt: new Date("2026-04-03T10:47:14"),
  },
  {
    name: "Darpan Abc",
    email: "dsquarechessacademy@gmail.com",
    phone: "9545145740",
    age: "32",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner Build confidence & discipline",
    createdAt: new Date("2026-04-04T16:38:05"),
  },
  {
    name: "Samuel Rose",
    email: "test@gmail.com",
    phone: "9192454534",
    age: "9",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-04-05T04:03:11"),
  },
  {
    name: "Anvay Gupta Aparna Wale",
    email: "aparnawale11@gmail.com",
    phone: "88796564885",
    age: null,
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "Beginner",
    createdAt: new Date("2026-04-26T10:43:47"),
  },
  {
    name: "Pranshu Jangir Vikas Jangir",
    email: "vikas.jangir007@gmail.com",
    phone: "95609577567",
    age: null,
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "Beginner",
    createdAt: new Date("2026-06-13T07:42:29"),
  },
  {
    name: "Magzh mYTHILI",
    email: "mythilisr24@gmail.com",
    phone: "75500051616",
    age: null,
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-06-23T10:22:43"),
  },
  {
    name: "dg sf",
    email: "sangamkumarsingh555@gmail.com",
    phone: "68990083446",
    age: null,
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-07-04T18:13:46"),
  },
  {
    name: "dg et",
    email: "sangamkumarsingh555@gmail.com",
    phone: "86970679005",
    age: null,
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-07-04T18:16:35"),
  },
  {
    name: "Aadvitha Mallikarjun",
    email: "mallik1705@gmail.com",
    phone: "85833594097",
    age: null,
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "beginner",
    createdAt: new Date("2026-07-08T02:42:50"),
  },
  {
    name: "Adyaveer Shashi Kumar",
    email: "email2shashikumar@gmail.com",
    phone: "8605914072",
    age: "4.5",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "Beginner",
    createdAt: new Date("2026-07-27T23:36:15"),
  },
  {
    name: "Rushda Mehar Hussain",
    email: "meharunissa3@gmail.com",
    phone: "89044881162",
    age: null,
    level: "Intermediate",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "Intermediate",
    createdAt: new Date("2026-08-30T14:17:26"),
  },
  {
    name: "monika r sheethal",
    email: "monikar14m@gmail.com",
    phone: "6361074866",
    age: "21",
    level: "Beginner",
    mode: "Online",
    status: "NEW",
    source: "Imported Sheet",
    notes: "Beginner",
    createdAt: new Date("2026-09-09T00:42:05"),
  },
];

async function main() {
  console.log(`Starting to import ${leadsToImport.length} leads...`);

  let count = 0;
  for (const lead of leadsToImport) {
    if ((prisma as any).lead) {
      await (prisma as any).lead.create({
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          age: lead.age,
          level: lead.level,
          mode: lead.mode,
          status: lead.status,
          source: lead.source,
          notes: lead.notes,
          createdAt: lead.createdAt,
        },
      });
      count++;
    } else {
      const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const insertSql = `
        INSERT INTO "Lead" ("id", "name", "age", "phone", "email", "level", "mode", "status", "source", "notes", "createdAt", "updatedAt")
        VALUES (
          '${id}',
          '${lead.name.replace(/'/g, "''")}',
          ${lead.age ? `'${lead.age.replace(/'/g, "''")}'` : "NULL"},
          '${lead.phone.replace(/'/g, "''")}',
          ${lead.email ? `'${lead.email.replace(/'/g, "''")}'` : "NULL"},
          '${lead.level.replace(/'/g, "''")}',
          '${lead.mode.replace(/'/g, "''")}',
          'NEW'::"LeadStatus",
          '${lead.source.replace(/'/g, "''")}',
          ${lead.notes ? `'${lead.notes.replace(/'/g, "''")}'` : "NULL"},
          '${lead.createdAt.toISOString()}'::timestamp,
          '${lead.createdAt.toISOString()}'::timestamp
        );
      `;
      await prisma.$executeRawUnsafe(insertSql);
      count++;
    }
  }

  console.log(`Successfully imported ${count} leads into the database!`);
}

main()
  .catch((e) => {
    console.error("Error importing leads:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
