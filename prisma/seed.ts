// @ts-nocheck

import { prisma } from "../src/server/db";
import fs from "fs/promises";

async function main() {
  const data = await fs.readFile("./prisma/skills.json", { encoding: "utf-8" });
  const skills = JSON.parse(data);
  const skillTree = await prisma.skillTree.findFirst();

  skills.forEach(
    async (skill: {
      pk: string;
      fields: { slug: string; title: string; icon: string; meta: {} };
    }) => {
      const fields = {
        treeId: skillTree?.id,
        slug: skill.fields.slug,
        title: skill.fields.title,
        icon: skill.fields.icon,
        metaData: { pk: skill.pk, ...skill.fields.meta },
        description: `${skill.fields.title} - Description`,
      };
      let dbSkill = await prisma.skill.findFirst({
        where: {
          slug: fields.slug,
        },
      });

      if (dbSkill) {
        await prisma.skill.update({
          where: {
            id: dbSkill.id,
          },
          data: fields,
        });
      } else {
        dbSkill = await prisma.skill.create({
          data: fields,
        });
      }
    }
  );

  const edgeData = await fs.readFile("./prisma/skill_relations.json", {
    encoding: "utf-8",
  });
  const edges = JSON.parse(edgeData);
  edges.forEach(async (edge) => {
    const parent = await prisma.skill.findFirst({
      where: {
        metaData: {
          path: ["pk"],
          equals: edge.fields.parent,
        },
      },
    });
    const child = await prisma.skill.findFirst({
      where: {
        metaData: {
          path: ["pk"],
          equals: edge.fields.skill,
        },
      },
    });

    if (!(child && parent)) {
      return;
    }

    const fields = {
      treeId: skillTree?.id,
      parentId: parent.id,
      childId: child.id,
      metaData: edge.fields.meta,
    };

    let dbEdge = await prisma.skillEdge.findFirst({
      where: {
        parentId: fields.parentId,
        childId: fields.childId,
      },
    });

    if (dbEdge) {
      await prisma.skillEdge.update({
        where: {
          id: dbEdge.id,
        },
        data: fields,
      });
    } else {
      await prisma.skillEdge.create({
        data: fields,
      });
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
