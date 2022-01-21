import { VFC } from "react";
import type { Recipe } from "@cooklang/parser";

interface RecipeRendererProps {
  name: string;
  recipe: ReturnType<typeof Recipe>;
}

export const RecipeRenderer: VFC<RecipeRendererProps> = ({ name, recipe }) => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mt-2">{name}</h2>
      <section className="mt-4 overflow-x-auto">
        <table className="table-fixed">
          <tbody>
            {Object.entries(recipe.metadata as Record<string, string>).map(
              ([key, value]) => (
                <tr key={key}>
                  <td className="whitespace-nowrap font-medium pr-4 align-top">
                    {key}:
                  </td>
                  <td className="break-all align-top">
                    {value?.startsWith("http") ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
      <div className="flex flex-wrap mt-8 gap-4">
        <section className="p-4 border border-zinc-300 rounded min-w-[10rem] w-full md:w-auto relative">
          <h3
            className="text-xs font-bold text-zinc-700 uppercase bg-white px-3
                       inline-block absolute -top-2 left-[5px]"
          >
            Ingredients
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-0.5">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.name} className="pr-2">
                <span className="font-medium text-rose-700">
                  {ingredient.quantity} {ingredient.units}
                </span>{" "}
                <span>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="p-4 border border-zinc-300 rounded min-w-[10rem] w-full md:w-auto relative">
          <h3
            className="text-xs font-bold text-zinc-700 uppercase bg-white px-3
                       inline-block absolute -top-2 left-[5px]"
          >
            Cookware
          </h3>
          <ul className="mt-2 list-inside list-disc">
            {recipe.cookware.map((cookware) => (
              <li key={cookware.name}>
                <span>{cookware.quantity}</span>
                <span>{cookware.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ol className="list-decimal ml-6 mt-10 space-y-4">
        {recipe.steps.map((step, i) => (
          <li key={i} className="text-lg leading-relaxed">
            {step.map((token, i) => {
              if (token.type === "text") {
                return (
                  <span key={i} data-token="text">
                    {token.value}
                  </span>
                );
              }
              if (token.type === "timer") {
                return (
                  <span key={i} data-token="timer" title={token.name}>
                    {token.quantity} {token.units}
                  </span>
                );
              }
              if (token.type === "ingredient") {
                return (
                  <span
                    key={i}
                    data-token="ingredient"
                    title={`${token.quantity} ${token.units}`}
                  >
                    {token.name}
                  </span>
                );
              }
              if (token.type === "cookware") {
                return (
                  <span key={i} data-token="cookware">
                    {token.name}
                  </span>
                );
              }
            })}
          </li>
        ))}
      </ol>
      <div className="h-20" />
    </div>
  );
};
