import { Order } from '../../@types/constants/Order';
import { Analyze } from '../../@types/entities/Analyze';
import { AnalyzeAnswer } from '../../@types/entities/AnalyzeAnswer';

export function sortCommentsByDate(
  comments: AnalyzeAnswer['comments'],
  order: Order,
) {
  return comments.slice().sort((a, b) => {
    if (order === 'ASC') {
      return a.createdAt > b.createdAt ? 1 : -1;
    }
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}
