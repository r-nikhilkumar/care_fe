import { useState } from "react";

import CareIcon from "@/CAREUI/icons/CareIcon";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import routes from "@/Utils/request/api";
import useQuery from "@/Utils/request/useQuery";
import { QuestionnaireDetail } from "@/types/questionnaire/questionnaire";

interface QuestionnaireSearchProps {
  onSelect: (questionnaire: QuestionnaireDetail) => void;
  disabled?: boolean;
}

export function QuestionnaireSearch({
  onSelect,
  disabled,
}: QuestionnaireSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: questionnaireList,
    loading: listLoading,
    error: _listError,
  } = useQuery(routes.questionnaire.list);

  const filteredQuestionnaires = (questionnaireList?.results ?? []).filter(
    (item: QuestionnaireDetail) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] justify-between"
          disabled={disabled || listLoading}
        >
          {listLoading ? (
            <>
              <CareIcon
                icon="l-spinner"
                className="mr-2 h-4 w-4 animate-spin"
              />
              Loading...
            </>
          ) : (
            <span>Add Questionnaire</span>
          )}
          {/* <CareIcon icon="l-chevron-down" className="ml-2 h-4 w-4" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <CareIcon
            icon="l-search"
            className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
          />
          <input
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search questionnaires..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto p-0">
          {filteredQuestionnaires.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              No questionnaires found
            </div>
          ) : (
            <div className="grid gap-1 p-2">
              {filteredQuestionnaires.map((item: QuestionnaireDetail) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  <CareIcon icon="l-file-export" className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
