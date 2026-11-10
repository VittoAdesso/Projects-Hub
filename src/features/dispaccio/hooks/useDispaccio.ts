import { useCallback, useMemo, useState } from 'react';
import { DAYS } from '../data/constants';
import { TR } from '../data/translations';
import { buildPrompt, pComb } from '../prompts/builders';
import type { HorizonIndex, Lang, TopicId, WindowIndex } from '../types';

export function useDispaccio() {
  const [lang, setLang] = useState<Lang>('it');
  const [windowIdx, setWindowIdx] = useState<WindowIndex>(1);
  const [horizonIdx, setHorizonIdx] = useState<HorizonIndex>(1);
  const [selectedTopics, setSelectedTopics] = useState<Set<TopicId>>(new Set());
  const [previewsOpen, setPreviewsOpen] = useState<Set<TopicId>>(new Set());
  const [editorsOpen, setEditorsOpen] = useState<Set<TopicId>>(new Set());
  const [customEdits, setCustomEdits] = useState<Map<TopicId, string>>(new Map());

  const days = DAYS[windowIdx] ?? 3;

  const toggleTopic = useCallback((id: TopicId) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTopics(new Set());
  }, []);

  const togglePreview = useCallback((id: TopicId) => {
    setPreviewsOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleEditor = useCallback((id: TopicId) => {
    setEditorsOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const updateCustomEdit = useCallback((id: TopicId, text: string) => {
    setCustomEdits((prev) => {
      const next = new Map(prev);
      next.set(id, text);
      return next;
    });
  }, []);

  const resetCustomEdit = useCallback((id: TopicId) => {
    setCustomEdits((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const getTopicPrompt = useCallback(
    (id: TopicId, quick: boolean): string => {
      return buildPrompt(id, quick, { lang, days, horizonIdx });
    },
    [lang, days, horizonIdx]
  );

  const getEditorValue = useCallback(
    (id: TopicId): string => {
      const custom = customEdits.get(id);
      if (custom !== undefined) {
        return custom;
      }
      return buildPrompt(id, false, { lang, days, horizonIdx });
    },
    [customEdits, lang, days, horizonIdx]
  );

  const combinedPrompt = useMemo<string>(() => {
    if (selectedTopics.size === 0) return '';
    const items = [...selectedTopics].map((id) => TR[lang][id]);
    return pComb(items, days, horizonIdx, lang);
  }, [selectedTopics, lang, days, horizonIdx]);

  return {
    lang,
    setLang,
    windowIdx,
    setWindowIdx,
    horizonIdx,
    setHorizonIdx,
    days,
    selectedTopics,
    toggleTopic,
    clearSelection,
    previewsOpen,
    togglePreview,
    editorsOpen,
    toggleEditor,
    getTopicPrompt,
    getEditorValue,
    updateCustomEdit,
    resetCustomEdit,
    combinedPrompt,
    isDirty: useCallback((id: TopicId) => customEdits.has(id), [customEdits]),
  };
}
