import { Box } from "@mui/material";
import React, { useState } from "react";
import TitleWithDivider from "../../../../../../common/components/title_with_divider";
import RecipeListFilterTagChip from "./recipe_list_filter_tag_item";

function RecipeListFilterTags({
  onTagAdded,
  onTagDeleted,
}) {
  // DEBUG
  const data = [
    {
      id: 1,
      name: "중식",
    },
    {
      id: 2,
      name: "한식",
    },
    {
      id: 3,
      name: "양식",
    },
    {
      id: 4,
      name: "일식",
    },
    {
      id: 5,
      name: "월식",
    },
    {
      id: 6,
      name: "잡식",
    },
    {
      id: 7,
      name: "육식",
    },
    {
      id: 8,
      name: "채식",
    },
    {
      id: 9,
      name: "오태식",
    },
  ];

  const [tags, setTags] = useState(
    data.map((tag) => ({ ...tag, selected: false }))
  );

  /**
   * add or delete tag to selected tags
   * @param {Integer} tag_id
   */
  const toggleTagSelected = (tag_id) => {
    // check selected
    tags.forEach((tag) => {
      if (tag.id === tag_id) {
        if (tag.selected) {
          onTagDeleted(tag_id);
        } else {
          onTagAdded(tag_id);
        }
      }
    });

    // set color toggle
    setTags(
      tags.map((tag) =>
        tag.id === tag_id
          ? { ...tag, selected: !tag.selected }
          : tag
      )
    );
  };

  const tagItems = tags.map((tag) => (
    <RecipeListFilterTagChip
      tag={tag}
      onClick={(e) => toggleTagSelected(tag.id)}
    />
  ));

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TitleWithDivider variant="h6" title="요리 태그" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 1,
        }}
      >
        {tagItems}
      </Box>
    </Box>
  );
}

export default RecipeListFilterTags;
