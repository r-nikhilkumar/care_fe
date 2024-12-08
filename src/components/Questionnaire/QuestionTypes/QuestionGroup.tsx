import { memo } from "react";

import { Label } from "@/components/ui/label";

import { QuestionValidationError } from "@/types/questionnaire/batch";
import type { QuestionnaireResponse } from "@/types/questionnaire/form";
import type { Question } from "@/types/questionnaire/question";

import { QuestionInput } from "./QuestionInput";

interface QuestionGroupProps {
  question: Question;
  questionnaireResponses: QuestionnaireResponse[];
  updateQuestionnaireResponseCB: (response: QuestionnaireResponse) => void;
  errors: QuestionValidationError[];
  clearError: (questionId: string) => void;
  disabled?: boolean;
}

export const QuestionGroup = memo(function QuestionGroup({
  question,
  questionnaireResponses,
  updateQuestionnaireResponseCB,
  errors,
  clearError,
  disabled,
}: QuestionGroupProps) {
  if (question.type !== "group") {
    return (
      <QuestionInput
        question={question}
        questionnaireResponses={questionnaireResponses}
        updateQuestionnaireResponseCB={updateQuestionnaireResponseCB}
        errors={errors}
        clearError={() => clearError(question.id)}
        disabled={disabled}
      />
    );
  }

  return (
    <div className="space-y-4">
      {question.text && (
        <div className="space-y-1">
          <Label className="text-lg font-semibold text-green-600">
            {question.text}
          </Label>
          {question.description && (
            <p className="text-sm text-muted-foreground">
              {question.description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-2">
        {question.questions?.map((subQuestion) => (
          <QuestionGroup
            key={subQuestion.id}
            question={subQuestion}
            questionnaireResponses={questionnaireResponses}
            updateQuestionnaireResponseCB={updateQuestionnaireResponseCB}
            errors={errors}
            clearError={clearError}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
});
