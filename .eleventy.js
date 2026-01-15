
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add global data for current year
  eleventyConfig.addGlobalData("year", new Date().getFullYear());
  
  // Add date filter for Nunjucks
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return format
      .replace("%Y", d.getFullYear())
      .replace("%m", String(d.getMonth() + 1).padStart(2, "0"))
      .replace("%d", String(d.getDate()).padStart(2, "0"))
      .replace("%B", months[d.getMonth()])
      .replace("%b", monthsShort[d.getMonth()]);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}