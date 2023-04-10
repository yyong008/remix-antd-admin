// cores
import React, { useState } from "react";

// component: vendor
import { Form, Space, Tag } from "antd";

const { CheckableTag } = Tag;

const tagsData = [
  "全部",
  "类目一",
  "类目二",
  "类目三",
  "类目四",
  "类目五",
  "类目六",
  "类目七",
  "类目八",
  "类目九",
  "类目十",
  "类目十一",
  "类目十二",
];

const Category: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Books"]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      <Form.Item
        label="所属类目:"
        style={{
          display: "flex",
          width: "100%",
          paddingBottom: "10px",
        }}
      >
        <Space size={[0, 8]} wrap>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </Space>
      </Form.Item>
    </>
  );
};

export default Category;
