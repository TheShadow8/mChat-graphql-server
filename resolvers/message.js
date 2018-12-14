import { requireAuth } from '../configs/authentication';

export default {
  Message: {
    user: ({ userId }, args, { models }) =>
      models.User.findOne({ where: { id: userId } }, { raw: true }),
  },
  Query: {
    messages: requireAuth.createResolver(async (parent, { channelId }, { models, user }) =>
      models.Message.findAll(
        { order: [['created_at', 'ASC']] },
        { where: { channelId } },
        { raw: true }
      )
    ),
  },

  Mutation: {
    createMessage: requireAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Message.create({ ...args, userId: user.id });
        return true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return false;
      }
    }),
  },
};
