import { Recipe } from "cooklang-parser";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { RecipeRenderer } from "./components/RecipeRenderer";
import GithubCorner from "react-github-corner";

export const App = () => {
	const [recipeText, setRecipeText] = useState(sampleRecipe);
	const [recipeName, setRecipeName] = useState(sampleRecipeTitle);

	const data = Recipe(recipeText);

	return (
		<div className="container px-4 mx-auto">
			<GithubCorner href="https://github.com/biowaffeln/cooklang-parser" />
			<h1 className="mt-16 text-3xl font-bold">Cooklang Parser Demo</h1>
			<div className="grid gap-6 mt-10 md:grid-cols-2">
				<div className="flex flex-col h-[70vh]">
					<input
						className="h-10 mb-2 border border-gray-300 rounded bg-gray-50
                       focus:outline-none focus:border-gray-400 px-4 py-2 text-lg"
						placeholder="Recipe Name"
						value={recipeName}
						onChange={(e) => setRecipeName(e.target.value)}
					/>
					<textarea
						className="rounded border p-4 border-gray-300 bg-gray-50
                       text-lg text-gray-800 h-full resize-none
                       focus:outline-none focus:border-gray-400"
						value={recipeText}
						onChange={(e) => setRecipeText(e.target.value)}
					/>
				</div>
				<Tabs.Root defaultValue="Output" className="max-h-[70vh] flex flex-col">
					<Tabs.List className="-mb-px flex gap-1">
						<Tabs.Trigger value="Output" className="tab">
							Output
						</Tabs.Trigger>
						<Tabs.Trigger value="AST" className="tab">
							AST
						</Tabs.Trigger>
					</Tabs.List>
					<div className="overflow-y-auto border border-gray-300">
						<Tabs.TabsContent value="AST">
							<pre className="p-4 text-sm whitespace-pre-wrap text-gray-700">
								{JSON.stringify(data, null, 2)}
							</pre>
						</Tabs.TabsContent>
						<Tabs.Content value="Output">
							<RecipeRenderer name={recipeName} recipe={data}></RecipeRenderer>
						</Tabs.Content>
					</div>
				</Tabs.Root>
			</div>
		</div>
	);
};

const sampleRecipe = `>> source: https://www.dinneratthezoo.com/wprm_print/6796
>> total time: 6 minutes
>> servings: 2

Place the @apple juice{1,5%cups}, @banana{one sliced}, @frozen mixed berries{1,5%cups} and @vanilla greek yogurt{3/4%cup} in a #blender{}; blend until smooth. If the smoothie seems too thick, add a little more liquid (1/4 cup). 

Taste and add @honey{} if desired. Pour into two glasses and garnish with fresh berries and mint sprigs if desired.
`;

const sampleRecipeTitle = "Mixed Berry Smoothie";
