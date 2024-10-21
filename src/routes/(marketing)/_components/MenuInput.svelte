<script lang="ts">
  type InputType = "text" | "password" | "checkbox" | "email" | "select" | "date" | "number" | "file";
  export let label = "";
  export let id = "";
  export let type: InputType;
  export let name = "";
  export let value = "";
  export let error: string | string[] | undefined = "";
  export let placeholder = "";
  export let required = false;
  export let options: any = []; // For select inputs
  export let checked = false; // For checkbox inputs
  export let files: FileList | null = null; // For file inputs
  export let onCheckedChange = (arg: any) => {}; // For checkbox inputs

  function handleCheckboxChange(event: any) {
    checked = event.target.checked;
    onCheckedChange(checked);
  }
</script>

<div class="flex items-baseline">
  {#if required && type !== 'checkbox'}
    <span class="text-red-400 italic mr-1">*</span>
  {/if}
  <span class="font-serif italic text-lg mr-2 text-gray-800">{label}</span>
  {#if type !== 'checkbox'}
    <div class="flex-grow border-b border-dotted border-gray-400"></div>
  {/if}
  {#if type === 'email'}
    <input
      type="email"
      {id}
      {placeholder}
      {name}
      bind:value
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2 font-serif"
    />
  {:else if type === 'password'}
    <input
      type="password"
      {id}
      {placeholder}
      {name}
      bind:value
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2 font-serif"
    />
  {:else if type === 'date'}
    <input
      type="date"
      {id}
      {placeholder}
      {name}
      bind:value
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2 font-serif"
    />
  {:else if type === 'number'}
    <input
      type="number"
      {id}
      {placeholder}
      {name}
      bind:value
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2 font-serif"
    />
  {:else if type === 'select'}
    <select
      {id}
      {name}
      bind:value
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2 font-serif w-36"
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else if type === 'checkbox'}
    <input
      type="checkbox"
      {id}
      {name}
      checked={checked}
      on:change={handleCheckboxChange}
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2"
    />
	{:else if type === 'file'}
    <input
      type="file"
      {id}
      {name}
	  bind:files
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2"
    />

  {:else}
    <input
      type="text"
      {id}
      {placeholder}
      {name}
      bind:value
      class="ml-2 rounded-sm bg-gray-50 border-gray-400 border p-2 font-serif"
    />
  {/if}
</div>
{#if error}
  <p class="text-red-500 text-sm mt-1 ml-[150px]">{error}</p>
{/if}
