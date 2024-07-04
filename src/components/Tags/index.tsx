import { useState, useEffect } from 'react';

import { TAG_COLORS } from '@/constants';
import generateTagIndex from '@/utils/generateTagIndex';

interface Tag {
  id: number;
  name: string;
  color: {
    text: string;
    background: string;
  };
}

interface TagsProps {
  tags: string[]; // 태그 목록
  customClass?: string; // 커스텀 TailwindCSS 클래스 지정
  onClick?: (tag: string) => void; // 클릭시 일어날 일
}

// 태그 이름과 색상 매핑
const tagColorMap: Record<string, { text: string; background: string }> = {};

// tags 문자열 배열을 Tag[] 형태로 변환하는 함수
const convertToTagObjects = (tags: string[]): Tag[] => {
  return tags.map((tag, index) => ({
    id: index + 1, // 각 태그에 1부터 시작하는 고유 id 지정
    name: tag,
    color: tagColorMap[tag] || { text: '', background: '' },
  }));
};

// 태그에 색상을 지정하는 함수
const generateTagColor = (tagList: Tag[]): Tag[] => {
  return tagList.map((tag) => {
    if (!tagColorMap[tag.name]) {
      // 태그 이름에 대한 색상이 매핑되지 않은 경우에만 새로 고유한 색상 할당
      const colorIndex = generateTagIndex(tag.name);
      const uniqueColor = TAG_COLORS[colorIndex];
      tagColorMap[tag.name] = uniqueColor;
    }
    return {
      ...tag,
      color: tagColorMap[tag.name],
    };
  });
};

export default function Tags({ tags, customClass, onClick }: TagsProps) {
  const [tagList, setTagList] = useState<Tag[]>([]); // 태그 객체 배열

  useEffect(() => {
    // tags 배열이 변경될 때마다 태그 리스트를 업데이트
    const initialTags = convertToTagObjects(tags);
    const tagsWithColors = generateTagColor(initialTags);
    setTagList(tagsWithColors);
  }, [tags]);

  return (
    <div className={`flex gap-[6px] scrollbar-hide ${customClass}`}>
      {tagList.map((tag) => (
        <span
          key={tag.id}
          className={`align-center relative h-[24px] flex-row rounded-[4px] px-[6px] pb-[2px] pt-[4px] text-[12px] ${onClick ? 'duration-200 hover:cursor-pointer hover:opacity-40' : ''}`}
          style={{ backgroundColor: tag.color.background, color: tag.color.text }}
          onClick={onClick ? () => onClick(tag.name) : undefined}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
