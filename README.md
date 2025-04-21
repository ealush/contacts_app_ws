# Contacts App Workshop

Setup instructions:

1. Clone the repository:

   ```bash
   git clone https://github.com/ealush/contacts_app_ws.git
   ```

2. Npm Install:

   ```bash
   npm install
   ```

3. Next.js build

   ```bash
    npm run build
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## In case you missed a step

You can always fast forward to the next module by running:

```bash
git fetch origin <module_name> && git checkout <module_name>
```

Where `<module_name>` is one of numbered the branchns in this repository.

### Starting point

00_ws_starter
01_favorites\_\_legacy_next_api_routs

### Getting the feel for server actions

02_favorites\_\_inline_server_action
03_contact_form\_\_server_action_in_a_different_file
04_contact_form\_\_two_actions_in_the_same_form
05_contact_form\_\_upsert_contact_server_action
06_remove_button\_\_excercise_remove_contact

### Server actions hooks

07_submit\_\_hooks_useFormStatus
08_pager\_\_hooks_send_message_with_useActionState
09_pager\_\_hooks_fetch_action_and_useTransition
10_pager\_\_hooks_send_temporary_message_with_useOptimistic
11_pager\_\_hooks_complete_useActionState_cycle
12_pager\_\_validations_add_next_safe_action

### Form validation

13_contact_form\_\_server_validation_with_vest
14_contact_form\_\_client_side_validation_with_vest
15_contact_form\_\_async_validation_for_email

### React 19 meta tags

16_header\_\_meta_tags_page_title
