using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Web.UI;

namespace Ext.Net
{
    [ToolboxItem(false)]
    [ToolboxBitmap(typeof(JalaliDate), "Build.ToolboxIcons.Plugin.bmp")]
    [ToolboxData("<{0}:JalaliDate runat=\"server\" />")]
    [Description("")]
    public partial class JalaliDate : Plugin
    {
        public JalaliDate()
        {
            
        }

        protected override List<ResourceItem> Resources
        {
            get
            {
                List<ResourceItem> baseList = base.Resources;
                baseList.Capacity += 4;

                baseList.Add(new ClientScriptItem(typeof(JalaliDate), "Ext.Net.Build.Ext.Net.ux.plugins.JalaliDate.Jalali.js", "/ux/plugins/JalaliDate/Jalali.js"));
                baseList.Add(new ClientScriptItem(typeof(JalaliDate), "Ext.Net.Build.Ext.Net.ux.plugins.JalaliDate.JalaliDate.js", "/ux/plugins/JalaliDate/JalaliDate.js"));
                baseList.Add(new ClientScriptItem(typeof(JalaliDate), "Ext.Net.Build.Ext.Net.ux.plugins.JalaliDate.JalaliDatePlugin.js", "/ux/plugins/JalaliDate/JalaliDatePlugin.js"));
                baseList.Add(new ClientScriptItem(typeof(JalaliDate), "Ext.Net.Build.Ext.Net.ux.plugins.JalaliDate.JalaliDatePlugin-fa_IR.js", "/ux/plugins/JalaliDate/JalaliDatePlugin-fa_IR.js"));

                return baseList;
            }
        }

        [Category("0. About")]
        [Description("")]
        public override string InstanceOf
        {
            get
            {
                return "Ext.ux.JalaliDatePlugin";
            }
        }
    }
}
