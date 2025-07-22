import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearFeedback } from '../store/gameSlice';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function FeedbackArea() {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state: RootState) => state.game);

  if (!feedback.visible) return null;

  return (
    <div className="mt-6">
      <Alert className={`relative ${feedback.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="flex items-start">
          {feedback.isCorrect ? (
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className={`font-medium ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {feedback.isCorrect ? 'Perfect!' : 'Not quite right'}
            </h4>
            <AlertDescription className={`mt-1 ${feedback.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {feedback.message}
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearFeedback())}
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
