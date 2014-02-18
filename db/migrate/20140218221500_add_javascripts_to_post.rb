class AddJavascriptsToPost < ActiveRecord::Migration
  def up
    add_column :posts, :javascripts, :text, :null => true
  end

  def down
    remove_column :posts, :javascripts
  end
end
