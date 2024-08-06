import { withPluginApi } from "discourse/lib/plugin-api";
import { iconHTML } from "discourse-common/lib/icon-library";

export default {
  name: "custom-details",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateCookedElement(
        (element) => {
          const cookedDetails = element.querySelectorAll("details");

          if (!cookedDetails.length) {
            return;
          }

          cookedDetails.forEach((details) => {
            details.setAttribute("open", "");

            const detailsFooter = document.createElement("div");
            detailsFooter.classList.add("details-footer");
            details.appendChild(detailsFooter);

            const detailsToggleButton = document.createElement("button");
            detailsToggleButton.classList.add("btn", "btn-icon-text", "details-toggle");
            detailsFooter.appendChild(detailsToggleButton);

            const createButtonContent = (textKey, iconName) => {
              const textSpan = document.createElement("span");
              textSpan.textContent = I18n.t(themePrefix(textKey));
              detailsToggleButton.appendChild(textSpan);

              const iconSpan = document.createElement("span");
              iconSpan.innerHTML = iconHTML(iconName);
              detailsToggleButton.appendChild(iconSpan);
            };

            createButtonContent('expand_details', 'angle-down');

            detailsToggleButton.addEventListener("click", () => {
              details.toggleAttribute("expanded");
              detailsToggleButton.innerHTML = ""; // Clear previous content

              createButtonContent(
                details.hasAttribute("expanded") ? 'collapse_details' : 'expand_details',
                details.hasAttribute("expanded") ? 'angle-up' : 'angle-down'
              );
            });
          });
        },
        { id: "custom-details" }
      );
    });
  },
};
