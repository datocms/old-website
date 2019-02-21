const findHtml = (page, pages) => {
  if (page.frontmatter.copyFrom) {
    const contentPage = pages.find(p =>
      p.path.includes(page.frontmatter.copyFrom),
    );
    return contentPage.html;
  }

  return page.html;
};

const findHeadings = (page, pages) => {
  if (page.frontmatter.copyFrom) {
    const contentPage = pages.find(p =>
      p.path.includes(page.frontmatter.copyFrom),
    );
    if (!contentPage) {
      console.log(page.frontmatter.copyFrom);
    }
    return contentPage.headings;
  }

  return page.headings;
};

const findFrontmatterValue = (value, page, pages) => {
  if (page.frontmatter[value]) {
    return page.frontmatter[value];
  }

  const contentPage = pages.find(p =>
    p.path.includes(page.frontmatter.copyFrom),
  );

  if (contentPage) {
    return contentPage.frontmatter[value];
  }

  return '';
};

const findTitle = findFrontmatterValue.bind(this, 'title');

module.exports = {
  findTitle,
  findHtml,
  findHeadings,
};
