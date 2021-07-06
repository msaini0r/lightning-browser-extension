import db from "../../db";

const get = async (message, sender) => {
  const host = message.args.host;
  console.log(host);
  const allowance = await db.allowances
    .where("host")
    .equalsIgnoreCase(host)
    .first();

  console.log(allowance);
  if (allowance) {
    const payments = await db.payments
      .where("host")
      .equalsIgnoreCase(allowance.host)
      .toArray();

    return {
      data: {
        name: allowance.name,
        host: allowance.host,
        imageURL: allowance.imageURL,
        enabled: allowance.enabled,
        payments,
        totalBudget: allowance.totalBudget,
        remainingBudget: allowance.remainingBudget,
        createdAt: allowance.createdAt,
      },
    };
  } else {
    return { data: { enabled: false } };
  }
};

export default get;